import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
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
  Trophy,
  MonitorPlay,
  Globe,
  Power,
  Play,
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
  AlertTriangle,
  Asterisk,
  Youtube,
  Video,
  Quote,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Newspaper,
  History
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

function cn(...inputs) {
  return twMerge(clsx(inputs));
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
    replays: "Replays", overlays: "Overlays", collections: "Collections",
    esports: "Esports", datastudio: "Data Studio", matchups: "Matchups",
    settings: "Settings", profile: "Profile", watch: "Watch Live",
    // Window
    minimize: "Minimize", close: "Close",
    // Stats
    kda: "KDA", dpmScore: "Oracle Score", kp: "KP", csm: "CSM", vision: "Vision Score", gpm: "GPM",
    goldDiff15: "Gold Diff @ 15", kaDiff15: "K+A Diff @ 15",
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
    early: "EARLY", mid: "MID", late: "LATE", live_pro: "LIVE PRO", spectate: "Spectate",
    replay: "REPLAY", victory: "Victory", defeat: "Defeat", theme_dark: "Dark", theme_light: "Light",
    visual_glass: "Glass", visual_opaque: "Opaque", records: "Records", lens: "Lens", behavioral: "Behavioral",
    pings: "Pings", solo_duo: "Solo/Duo", flex: "Flex", aram: "ARAM", coming_soon: "Coming soon...",
    appearance: "Appearance", chooseStyleDesc: "Choose between Liquid Glass or Solid",
    themeToggleDesc: "Toggle between Light and Dark mode",
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
    queue_unknown: "Unknown", ingame: "In Game", playing: "Playing", spectate_btn: "Spectate",
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
    // Tips
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
    // Coach Verdicts
    verdict_pivot: "Oracle : Strategic Pivot. You were the engine of your team. Your participation in kills defined the tempo of this match. You were everywhere, turning local skirmishes into map-wide advantages.",
    verdict_soul: "Oracle : Soul Reaper. Economic Dominator. You didn't just win your lane; you bankrupted your opponent. By denying resources and snowballing your lead, you made the enemy irrelevant.",
    verdict_fatal: "Oracle : Fatal Efficiency. Surgical Precision. You maximized every gold coin spent. Your damage output compared to your economy was off the charts, proving you don't need full build to be deadly.",
    verdict_pillar: "Oracle : Victory Pillar. The Bedrock. You were the reliable foundation your team needed. While you may not have topped every stat, your presence in key moments and solid macro play secured the victory.",
    verdict_vuln: "Oracle : Liability. You spent more time on the grey screen than impacting the map. Your positioning errors gave the enemy free gold and tempo. Stop forcing plays when you are behind.",
    verdict_eco: "Oracle : Resource Starved. Economic Asphyxia. You fell behind on the basics: farming. Fighting with an item disadvantage is a losing strategy. Prioritize catching waves before contesting.",
    verdict_leader: "Oracle : Lone Wolf. You played well individually, but failed to translate your lead into team advantages. KDA doesn't destroy the Nexus. You needed to use your strength to cover your team.",
    verdict_defeat: "Oracle : Macro Collapse. Mechanically decent, but you lost the map. You allowed the enemy to dictate the rotations and objective control. Review your mid-game decision making.",
    verdict_intro: "Oracle :",
    // New Verdicts
    verdict_perfect_kda: "Oracle : Immortal Performance. You never gave the enemy a shutdown. Perfect positioning and calculated aggression allowed you to deal damage without ever being caught.",
    verdict_penta: "Oracle : Apex Predator. A Pentakill is not luck, it's total dominance. You read the fight perfectly and executed every target. You ARE the carry.",
    verdict_visionary: "Oracle : All-Seeing Eye. Your vision control was suffocating. By tracking the enemy jungler and lighting up the map, you removed their ability to make plays.",
    verdict_carry_hard: "Oracle : 1v9 Machine. You participated in over 75% of your team's kills. If you weren't there, this game was over at 15 minutes. Absolute backpack performance.",
    verdict_stomp: "Oracle : Total Destruction. You ended the game with a massive gold lead. This wasn't a match, it was a clinic. You snowballed so hard the enemy never had a chance.",
    verdict_efficient: "Oracle : Economic Miracle. You did insane damage with limited gold. You didn't need items to outplay, just pure mechanical skill.",
    verdict_feeder: "Oracle : Intentional Griefing? Double digit deaths are unacceptable. You became a gold bag for the enemy carry. You must learn to play weakside and stop fighting.",
    verdict_blind: "Oracle : Playing in the Dark. Your vision score was non-existent. You facechecked bushes and got caught because you refused to buy control wards. Map awareness is free.",
    verdict_afk_farm: "Oracle : PvE Player. You have high CS but low impact. While you were farming wolves, your team was losing the game. League is PvP, join the fights.",
    verdict_solid_effort: "Oracle : Tragic Hero. You tried your best. You won your lane and had good stats, but couldn't carry the heavy teammates. Sometimes you can't win them all.",
    verdict_rich_loser: "Oracle : Shopkeeper's Best Friend. You had full build but lost. Gold is useless if you get caught before the elder dragon fight. Positioning > Items.",
    verdict_unlucky_carry: "Oracle : Team Gap. You did everything right, highest damage, high KP, but the team difference was too big. Keep your mental up, you played well.",
    // Analysis Points
    pos_kda: "Excellent contribution to fights (Solid KDA)",
    pos_multikill: "Decisive impact in teamfights (Multikill)",
    pos_kp: "Omnipresent in team actions (High KP)",
    pos_farm: "Imperial farming, constant economic lead",
    pos_gold: "You crushed your opponent in gold",
    pos_obj: "Strong focus on objectives (Towers/Dragons)",
    pos_vision: "Good map control through vision",
    pos_carry: "Main carry: High damage share",
    pos_default: "Played solid until the end",
    neg_deaths: "Too many deaths, you fed the opponent",
    neg_kp: "Kill participation too low. Played too solo.",
    neg_farm: "Insufficient last-hitting, significant gold deficit",
    neg_gold: "Economically dominated by your opponent",
    neg_obj: "Zero pressure on towers/dragons (Objectives ignored)",
    neg_vision: "Map too dark, lack of critical information",
    neg_support_vision: "Insufficient vision for a Support",
    neg_jungle_impact: "Ghost Jungler: little impact on lanes",
    neg_damage: "Lack of offensive impact in trades",
    neg_default: "No major mistakes detected",
    analysis_pos: "Positive Points",
    analysis_neg: "Negative Points",
    matchup_stomp: "You literally crushed {{champ}}. Your advantage allowed you to take them out of the game.",
    matchup_lost_lane_won_game: "You won, but {{champ}} dominated the lane. Work on your laning phase.",
    matchup_won_lane_lost_game: "Frustrating match. You won your duel against {{champ}}, but couldn't transfer the lead.",
    matchup_feeding: "Nightmare matchup. {{champ}} took an early lead. Respect cooldowns more.",
    matchup_passive: "Very passive farming duel. Take more calculated risks to lead.",
    matchup_neutral: "Neutral matchup. Vision and rotations made the difference.",
    matchup_vision_gap: "Vision warning. {{champ}} had much better map control.",
    matchup_default: "Close duel against {{champ}}. Analyze their spell timings.",
    profile_not_found_title: "Profile Not Found",
    profile_not_found_desc: "The player is not found or does not exist in this region.",
    others: "Others",
    waiting_for_league: "Waiting for League Client",
    launch_game_desc: "Please launch your League of Legends client to access Oracle tools.",
  },
  fr: {
    cat_core: "ORACLE CORE", cat_app: "ORACLE APP", cat_insights: "ORACLE INSIGHTS",
    dashboard: "Tableau de bord", tierlist: "Builds & Tips", leaderboards: "Classements",
    replays: "Replays", overlays: "Overlays", collections: "Collections",
    esports: "Esports", datastudio: "Data Studio", matchups: "Matchups",
    settings: "ParamÃƒÂ¨tres", profile: "Profil", watch: "Regarder",
    connected: "En ligne", disconnected: "Hors ligne",
    searchPlaceholder: "Rechercher invocateur...", visualStyle: "Style Visuel", colorTheme: "ThÃƒÂ¨me Couleur",
    language: "Langue", startup: "Lancer au dÃƒÂ©marrage", glass: "Glass", opaque: "Opaque",
    themeToggle: "Basculer Clair/Sombre", chooseStyle: "Apparence Visuelle",
    chooseLang: "SÃƒÂ©lectionner la langue", startupDesc: "Comportement au dÃƒÂ©marrage",
    auto_accept: "Acceptation Auto", auto_accept_desc: "Accepter automatiquement les parties dÃƒÂ¨s qu'elles sont trouvÃƒÂ©es.",
    auto_import: "Import Auto Runes", auto_import_desc: "Importer automatiquement les meilleures runes pour votre champion.",
    flash_position: "Position du Flash", flash_left: "Gauche (D)", flash_right: "Droite (F)",
    overlay_settings: "ParamÃƒÂ¨tres d'Overlay", ingame_modules: "Modules en jeu",
    edit_layout: "Modifier la Disposition", save_layout: "Sauvegarder & Quitter",
    reset_layout: "RÃƒÂ©initialiser",
    loading_screen: "Overlay Chargement", loading_desc: "Stats des joueurs pendant le chargement",
    winrate_toggle: "PrÃƒÂ©diction de Victoire (ALT+O)", winrate_desc: "Pourcentage de chance de victoire en temps rÃƒÂ©el",
    jungle_pathing: "Chemin Jungle", jungle_pathing_desc: "Meilleures routes et timers",
    ward_timer: "Rappel de Balise", ward_timer_desc: "Alerte quand changer/poser une balise",
    metaTierList: "Meta Tier List", proReplays: "Replays Pro", waitingMatch: "En attente du match",
    clientDisconnected: "Client DÃƒÂ©connectÃƒÂ©", liveMatch: "LIVE",
    rank: "Rang", champion: "Champion", role: "RÃƒÂ´le", winrate: "Taux Victoire", ban: "Taux Ban", tier: "Tier",
    kda: "KDA", dpmScore: "ORACLE SCORE", kp: "KP", csm: "CSM", vision: "Score Vision", gpm: "GPM",
    goldDiff15: "Diff. Gold @ 15", kaDiff15: "Diff. K+A @ 15",
    appearance: "Apparence", chooseStyleDesc: "Choisissez entre Liquid Glass ou Solide",
    themeToggleDesc: "Basculer entre les modes Clair et Sombre",
    langSelectDesc: "SÃƒÂ©lectionnez votre langue prÃƒÂ©fÃƒÂ©rÃƒÂ©e",
    gold_sound_label: "Alerte Or (1200g)",
    gold_sound_desc: "Joue un son quand vous atteignez 1200 gold",
    test_mode_label: "Mode TEST Overlays",
    test_mode_desc: "Affiche tous les overlays pour test",
    edit_layout_desc: "Ajustez la position de chaque module sur votre ÃƒÂ©cran.",
    layout_editor_title: "Ãƒâ€°diteur d'Overlay Oracle",
    layout_editor_desc: "Glissez les modules pour les repositionner",
    game_space: "Espace de Jeu",
    cancel: "Annuler",
    confirm_reset: "RÃƒÂ©initialiser les positions des overlays ?",
    reset_default: "RÃƒÂ©initialiser les positions par dÃƒÂ©faut",
    skill_advice: "Conseil : AmÃƒÂ©liorer",
    gold_alert: "Alerte Gold",
    gold_deficit_massive: "DÃƒÂ©ficit massif :",
    gold_advantage_massive: "Avantage massif :",
    ward_advice: "Oracle suggÃƒÂ¨re une balise maintenant.",
    blue_team: "Ãƒâ€°quipe Bleue",
    red_team: "Ãƒâ€°quipe Rouge",
    jungle_insight: "Insight Jungle",
    logic_pathing: "Parcours Logique",
    next_camp: "Prochain :",
    connectLcu: "Connexion au Client League...", vs1w: "vs il y a 1 sem",
    // Game Modes & Status
    queue_custom: "PersonnalisÃƒÂ©", queue_draft: "Draft", queue_solo: "ClassÃƒÂ© Solo", queue_flex: "ClassÃƒÂ© Flex",
    queue_blind: "Aveugle", queue_aram: "ARAM", queue_arena: "Arena", queue_urf: "URF", queue_coop: "Co-op vs IA",
    queue_unknown: "Inconnu", ingame: "Partie en cours", playing: "Joue", spectate_btn: "Spectateur",
    explore_oracle: "Explorez l'app ORACLE", season: "Saison 15", owned_skins: "Skins possÃƒÂ©dÃƒÂ©s",
    survivability: "SurvivabilitÃƒÂ©", tf_deaths: "Morts en Teamfight", performance: "Performance par champion",
    all: "TOUS", mvp: "MVP", score: "score", deaths: "Morts", ka: "Kills + Assists",
    early: "DÃƒâ€°BUT", mid: "MILIEU", late: "FIN", live_pro: "PRO EN DIRECT", spectate: "Regarder",
    replay: "REPLAY", victory: "Victoire", defeat: "DÃƒÂ©faite", theme_dark: "Sombre", theme_light: "Clair",
    visual_glass: "Glass", visual_opaque: "Opaque", records: "Records", lens: "Lens", behavioral: "Comportemental",
    pings: "Pings", solo_duo: "Solo/Duo", flex: "Flex", aram: "ARAM", coming_soon: "BientÃƒÂ´t disponible...",
    // New Additions
    waiting_for_match: "En attente du match...", enter_game_live: "Veuillez entrer en jeu pour voir les stats.", toggle_hint: "[CTRL+X] POUR BASCULER",
    team_blue: "Ordre (Bleu)", team_red: "Chaos (Rouge)", you: "VOUS", hot_streak: "SÃƒâ€°RIE",
    matchup_analysis: "Analyse Matchup", strategic_insight: "Insight StratÃƒÂ©gique", counter_items: "Objets Contre RecommandÃƒÂ©s",
    esports_center: "Centre Esports", switch_source: "Changer Source", upcoming_matches: "Matchs ÃƒÂ  venir", latest_news: "DerniÃƒÂ¨res Actus",
    collections_title: "Collections", rankings_title: "Classements",
    launch_custom: "Lancez une partie perso pour configurer.", start_editor: "Lancer Ãƒâ€°diteur Overlay",
    select_champion: "Choisir Champion", search_champion: "Chercher...",
    rank_header: "Rang", lp_header: "LP", winrate_header: "Taux Victoire", games_header: "Parties", summoner_header: "Invocateur",
    no_games_found: "Aucune partie trouvÃƒÂ©e", search_summoner_profile: "Chercher profil invocateur", search_result: "Rechercher",
    most_kills: "Plus de Kills", dmg_dealt: "DÃƒÂ©gÃƒÂ¢ts infligÃƒÂ©s", vision_score: "Score Vision", cs_min: "CS / min", season_best: "MEILLEURE SAISON",
    aggression: "Agression", farming: "Farm", vision_radar: "Vision", survival: "Survie", objective: "Objectif",
    playstyle: "Style de jeu", focus: "Focus", aggressive_carry: "Carry Agressif", die_less: "Mourir Moins",
    skill_levelup: "Guide Sorts", jungle_timers: "Timers Jungle", objective_voting: "Vote Objectifs", gold_diff: "Diff. Or",
    last_20_games: "20 DerniÃƒÂ¨res Parties", summoner_not_found: "Invocateur Introuvable",
    strategic_desc_mock: "Irelia a un avantage significatif au niveau 2. Cherchez des ÃƒÂ©changes tÃƒÂ´t. Ãƒâ€°vitez Darius quand son E est dispo. Construisez Blade of the Ruined King en premier.",
    search_hint: "Rechercher Nom#Tag",
    region: "RÃƒÂ©gion",
    online: "En ligne", offline: "Hors ligne",
    preferred_roles: "RÃƒÂ´les PrÃƒÂ©fÃƒÂ©rÃƒÂ©s",
    // Build View
    build_runes_season: "Build, Runes Saison", patch: "Patch", recommended_plus: "P+ RecommandÃƒÂ©",
    summoner_spells: "Sorts d'Invocateur", skill_order: "Ordre des CompÃƒÂ©tences",
    max_1st: "Max 1er", max_2nd: "Max 2ÃƒÂ¨me", max_3rd: "Max 3ÃƒÂ¨me",
    boots_options: "Options Bottes", starters: "Objets de DÃƒÂ©part", core_build_path: "Build Principal",
    matchups_analysis: "Analyse Matchups", strong_against: "Fort Contre", weak_against: "Faible Contre",
    rune_path: "Pages de Runes", launch: "Lancer", winrate_trend: "Tendance Winrate (30 Jours)",
    // Matchup View
    matchup_analysis_title: "Analyse Matchup",
    lane_kill_rate: "Taux Kill Lane", gold_15: "Or @ 15 min", early_wr: "Winrate DÃƒÂ©but", late_wr: "Winrate Fin", first_tower: "PremiÃƒÂ¨re Tour",
    analysis_direct: "Analyse Directe", duel_vs: "Duel contre", guide_matchup: "Guide Matchup", rival: "RIVAL",
    searching: "RECHERCHE...", sync_data: "Synchronisation...", coach_verdict: "Verdict Coach", view_tips: "Voir Conseils", back_btn: "Retour", matchup_tips_title: "Astuces Matchup",

    // Profile & Replays
    profile_not_found: "Profil Introuvable", summoner_not_found_desc: "Le joueur est introuvable ou n'existe pas dans cette rÃƒÂ©gion.",
    recent_matches: "Matchs RÃƒÂ©cents", no_match_found: "Aucun match trouvÃƒÂ©...", phase_label: "Phase",
    no_partners: "Aucun joueur rÃƒÂ©cent", games_played: "Parties jouÃƒÂ©es", top_champions: "Top Champions", recent_players: "Joueurs RÃƒÂ©cents",
    loading_replays: "Chargement des replays...", and_ai_coaching: "& Coaching IA", replays_desc: "Visionnez vos parties et recevez des conseils personnalisÃƒÂ©s par l'IA.",
    games_found: "Parties trouvÃƒÂ©es", watchable: "Visionnables", ai_analyzer_title: "Analyseur IA Oracle",
    ai_analyzer_desc: "SÃƒÂ©lectionnez une partie sur la gauche pour gÃƒÂ©nÃƒÂ©rer un rapport complet de coaching et identifier vos erreurs.",
    analyzing_caps: "ANALYSE...", close_duel: "Fermer Duel", analyze_duel: "Analyse Duel", opponent: "Adversaire",
    sync_data_opp: "Synchronisation...", key_tips: "Conseils ClÃƒÂ©s", analysis_timeline: "Chronologie", events: "Ãƒâ€°VÃƒâ€°NEMENTS",
    tactical_analysis: "Analyse tactique...", watch_replay: "Visionner Replay",
    stat_obj_focus: "Focus Objectif", stat_mechanics: "MÃƒÂ©caniques", stat_kda_perf: "Perf KDA", stat_farming: "Farming",
    matchup_desc_example: "a un avantage significatif au niveau 2. Cherchez les ÃƒÂ©changes rapides.",
    // Tips
    tip_deaths_title: "Morts Excessives", tip_deaths_desc: "Taux de mortalitÃƒÂ© trop ÃƒÂ©levÃƒÂ©. Vous donnez trop de ressources.",
    tip_survival_title: "Survie Parfaite", tip_survival_desc: "Aucune mort. Positionnement irrÃƒÂ©prochable.",
    tip_csm_title: "Retard de Farm", tip_csm_desc: "CS/min critique. Priorisez les sbires.",
    tip_multikill_title: "Multi-Kill", tip_multikill_desc: "Excellente gestion des fights.",
    tip_vision_elite_title: "Vision Ãƒâ€°lite", tip_vision_elite_desc: "Vision au-dessus de la moyenne. Bon contrÃƒÂ´le.",
    tip_vision_poor_title: "CÃƒÂ©citÃƒÂ© Carte", tip_vision_poor_desc: "Score vision faible. Achetez des Pinks.",
    tip_firstblood_title: "Premier Sang", tip_firstblood_desc: "Excellent avantage early.",
    tip_objective_title: "Focus Objectif", tip_objective_desc: "Grosse pression Tours/Dragons.",
    tip_cc_title: "MaÃƒÂ®tre du CC", tip_cc_desc: "Excellente utilisation des contrÃƒÂ´les.",
    tip_gold_title: "Capitalisation Ãƒâ€°co", tip_gold_desc: "QuantitÃƒÂ© d'or massive gÃƒÂ©nÃƒÂ©rÃƒÂ©e.",
    tip_tank_title: "RÃƒÂ©silience Absolue", tip_tank_desc: "Ãƒâ€°normes dÃƒÂ©gÃƒÂ¢ts mitigÃƒÂ©s.",
    tip_jungle_title: "Rythme Jungle", tip_jungle_desc: "Clearing trop lent.",
    tip_default_title: "Optimisation Or", tip_default_desc: "Concentrez-vous sur le farm.",
    // Verdicts
    verdict_pivot: "Oracle : Pivot StratÃƒÂ©gique. Vous ÃƒÂ©tiez le moteur de votre ÃƒÂ©quipe. Votre participation aux kills a dÃƒÂ©fini le tempo du match. Vous ÃƒÂ©tiez partout, transformant chaque escarmouche en avantage pour la carte.",
    verdict_soul: "Oracle : Moissonneur d'Ãƒâ€šmes. Domination Ãƒâ€°conomique. Vous n'avez pas juste gagnÃƒÂ© votre lane, vous avez ruinÃƒÂ© votre adversaire. En niant les ressources, vous avez rendu l'ennemi inutile.",
    verdict_fatal: "Oracle : EfficacitÃƒÂ© Fatale. PrÃƒÂ©cision Chirurgicale. Vous avez maximisÃƒÂ© chaque piÃƒÂ¨ce d'or dÃƒÂ©pensÃƒÂ©e. Vos dÃƒÂ©gÃƒÂ¢ts par rapport ÃƒÂ  votre ÃƒÂ©conomie sont hors normes. Pas besoin d'ÃƒÂªtre full build pour ÃƒÂªtre mortel.",
    verdict_pillar: "Oracle : Pilier de Victoire. Le Roc. Vous ÃƒÂ©tiez la fondation fiable dont votre ÃƒÂ©quipe avait besoin. Sans forcÃƒÂ©ment ÃƒÂªtre MVP, votre prÃƒÂ©sence aux moments clÃƒÂ©s et votre macro solide ont sÃƒÂ©curisÃƒÂ© la victoire.",
    verdict_vuln: "Oracle : Fardeau. Vous avez passÃƒÂ© plus de temps mort qu'ÃƒÂ  impacter la carte. Vos erreurs de positionnement ont offert de l'or gratuit. ArrÃƒÂªtez de forcer les plays quand vous ÃƒÂªtes derriÃƒÂ¨re.",
    verdict_eco: "Oracle : Asphyxie Ãƒâ€°conomique. Famine de Ressources. Vous avez ÃƒÂ©chouÃƒÂ© sur les bases : le farm. Se battre avec un dÃƒÂ©savantage d'items est une stratÃƒÂ©gie perdante. Priorisez les vagues de sbires.",
    verdict_leader: "Oracle : Loup Solitaire. Vous avez bien jouÃƒÂ© individuellement, mais n'avez pas su traduire votre avantage pour l'ÃƒÂ©quipe. Le KDA ne dÃƒÂ©truit pas le Nexus. Aidez vos alliÃƒÂ©s en difficultÃƒÂ©.",
    verdict_defeat: "Oracle : Effondrement Macro. MÃƒÂ©caniquement dÃƒÂ©cent, mais vous avez perdu la carte. Vous avez laissÃƒÂ© l'ennemi dicter les rotations et le contrÃƒÂ´le des objectifs. Revoyez vos dÃƒÂ©cisions en mid-game.",
    verdict_intro: "Oracle :",
    // New Verdicts
    verdict_perfect_kda: "Oracle : Immortel. Performance Parfaite. Vous n'avez jamais donnÃƒÂ© de prime. Un positionnement impeccable et une agression calculÃƒÂ©e.",
    verdict_penta: "Oracle : PrÃƒÂ©dateur Apex. Un Pentakill n'est pas de la chance, c'est une domination totale. Vous ÃƒÂªtes le carry.",
    verdict_visionary: "Oracle : Ã…â€™il Omniscient. Votre contrÃƒÂ´le de la vision ÃƒÂ©tait ÃƒÂ©touffant. En traquant le jungler ennemi, vous avez brisÃƒÂ© leurs plans.",
    verdict_carry_hard: "Oracle : Machine 1v9. Vous avez participÃƒÂ© ÃƒÂ  plus de 75% des kills. Sans vous, cette partie finissait ÃƒÂ  15 minutes. Performance sac ÃƒÂ  dos.",
    verdict_stomp: "Oracle : Destruction Totale. Une avance en or massive. Ce n'ÃƒÂ©tait pas un match, c'ÃƒÂ©tait une leÃƒÂ§on. L'ennemi n'a jamais eu sa chance.",
    verdict_efficient: "Oracle : Miracle Ãƒâ€°conomique. Des dÃƒÂ©gÃƒÂ¢ts insensÃƒÂ©s avec peu d'or. Pas besoin d'items pour outplay, juste du talent pur.",
    verdict_feeder: "Oracle : Morts ÃƒÂ  deux chiffres inacceptables. Vous ÃƒÂªtes devenu un sac d'or pour le carry adverse. Apprenez ÃƒÂ  jouer 'weakside' et cessez de forcer.",
    verdict_blind: "Oracle : Jeu dans le Noir. Score de vision inexistant. Vous avez pÃƒÂ©ri car vous refusez d'investir dans la vision. La carte est votre meilleure alliÃƒÂ©e.",
    verdict_afk_farm: "Oracle : Joueur PvE. Haut CS mais impact nul. Pendant que vous farmiez, votre ÃƒÂ©quipe perdait la partie. League est un jeu d'ÃƒÂ©quipe, rejoignez les combats.",
    verdict_solid_effort: "Oracle : HÃƒÂ©ros Tragique. Vous avez tout donnÃƒÂ©. Lane gagnÃƒÂ©e, bonnes stats, mais impossible de porter des alliÃƒÂ©s trop lourds.",
    verdict_rich_loser: "Oracle : Meilleur Ami du Marchand. Full build mais dÃƒÂ©faite. L'or est inutile si vous vous faites surprendre avant les combats dÃƒÂ©cisifs.",
    verdict_unlucky_carry: "Oracle : Team Gap. Vous avez tout bien fait, top dÃƒÂ©gÃƒÂ¢ts, haut KP, mais l'ÃƒÂ©cart d'ÃƒÂ©quipe ÃƒÂ©tait trop grand. Gardez le moral, vous avez bien jouÃƒÂ©.",
    // Points d'analyse
    pos_kda: "Excellente contribution aux combats (KDA solide)",
    pos_multikill: "Impact dÃƒÂ©cisif en teamfight (Multikill)",
    pos_kp: "OmniprÃƒÂ©sent sur les actions de l'ÃƒÂ©quipe (KP ÃƒÂ©levÃƒÂ©)",
    pos_farm: "Farming impÃƒÂ©rial, avance ÃƒÂ©conomique constante",
    pos_gold: "Tu as ÃƒÂ©crasÃƒÂ© ton vis-ÃƒÂ -vis aux golds",
    pos_obj: "Gros focus sur les objectifs (Tours/Dragons)",
    pos_vision: "Bon contrÃƒÂ´le de la carte par la vision",
    pos_carry: "Carry principal : Gros pourcentage de dÃƒÂ©gÃƒÂ¢ts",
    pos_default: "Tu as jouÃƒÂ© solide jusqu'au bout",
    neg_deaths: "Trop de morts, tu as nourri l'adversaire",
    neg_kp: "Participation aux kills trop faible. Trop solo.",
    neg_farm: "Last-hitting insuffisant, retard de gold important",
    neg_gold: "DominÃƒÂ© ÃƒÂ©conomiquement par ton vis-ÃƒÂ -vis",
    neg_obj: "Aucune pression sur les tours/dragons",
    neg_vision: "Carte trop sombre, manque d'information critique",
    neg_support_vision: "Vision insuffisante pour un Support",
    neg_jungle_impact: "Jungler fantÃƒÂ´me : peu d'impact sur les lanes",
    neg_damage: "Manque d'impact offensif dans les ÃƒÂ©changes",
    neg_default: "Aucune erreur majeure dÃƒÂ©tectÃƒÂ©e",
    analysis_pos: "Points Positifs",
    analysis_neg: "Points NÃƒÂ©gatifs",
    matchup_stomp: "Tu as littÃƒÂ©ralement ÃƒÂ©crasÃƒÂ© {{champ}}. Ton avantage a permis de le sortir de la partie.",
    matchup_lost_lane_won_game: "Tu as gagnÃƒÂ©, mais {{champ}} a dominÃƒÂ© la lane. Travaille ta phase de lane.",
    matchup_won_lane_lost_game: "Frustrant. Tu as gagnÃƒÂ© ton duel contre {{champ}}, mais n'as pas su transfÃƒÂ©rer l'avantage.",
    matchup_feeding: "Matchup cauchemar. {{champ}} a pris l'avantage tÃƒÂ´t. Respecte mieux les dÃƒÂ©lais de sorts.",
    matchup_passive: "Duel de farm trÃƒÂ¨s passif. Prends plus de risques calculÃƒÂ©s pour carry.",
    matchup_neutral: "Matchup neutre. La vision et les rotations ont fait la diffÃƒÂ©rence.",
    matchup_vision_gap: "Alerte vision. {{champ}} a beaucoup mieux contrÃƒÂ´lÃƒÂ© la carte.",
    matchup_default: "Duel serrÃƒÂ© contre {{champ}}. Analyse bien ses timings la prochaine fois.",
    profile_not_found_title: "Profil Introuvable",
    profile_not_found_desc: "Le joueur est introuvable ou n'existe pas dans cette rÃƒÂ©gion.",
    others: "Autres",
    waiting_for_league: "En attente de League of Legends",
    launch_game_desc: "Lancez votre client pour accÃƒÂ©der aux outils Oracle.",
  },
  es: {
    cat_core: "ORACLE CORE", cat_app: "ORACLE APP", cat_insights: "ORACLE INSIGHTS",
    dashboard: "Resumen", tierlist: "Builds & Tips", leaderboards: "ClasificaciÃƒÂ³n",
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
    rank: "Rango", champion: "CampeÃƒÂ³n", role: "Rol", winrate: "Winrate", ban: "Ban Rate", tier: "Tier",
    explore_oracle: "Explorar App ORACLE", season: "Temporada 15", owned_skins: "Skins en propiedad",
    survivability: "Supervivencia", tf_deaths: "Muertes en Teamfight", performance: "Rendimiento por campeÃƒÂ³n",
    all: "TODOS", mvp: "MVP", score: "puntuaciÃƒÂ³n", deaths: "Muertes", ka: "Asesinatos + Asistencias",
    early: "TEMPRANO", mid: "MEDIO", late: "TARDÃƒÂO", live_pro: "EN VIVO PRO", spectate: "Espectar",
    replay: "REPLAY", victory: "Victoria", defeat: "Derrota", theme_dark: "Oscuro", theme_light: "Claro",
    visual_glass: "Cristal", visual_opaque: "Opaco", records: "RÃƒÂ©cords", lens: "Lente", behavioral: "Comportamiento",
    pings: "Pings", solo_duo: "Solo/Duo", flex: "Flex", aram: "ARAM", coming_soon: "PrÃƒÂ³ximamente...",
    appearance: "Apariencia", chooseStyleDesc: "Elige entre Cristal LÃƒÂ­quido o SÃƒÂ³lido",
    themeToggleDesc: "Alternar entre modo Claro y Oscuro",
    langSelectDesc: "Selecciona tu idioma preferido",
    connectLcu: "Conectando al Cliente de League...", vs1w: "hace 1 sem",
    kda: "KDA", dpmScore: "PuntuaciÃƒÂ³n Oracle", kp: "KP", csm: "CSM", vision: "PuntuaciÃƒÂ³n de VisiÃƒÂ³n", gpm: "GPM",
    goldDiff15: "Dif. Oro @ 15", kaDiff15: "Dif. K+A @ 15",
    // Game Modes & Status
    queue_custom: "Personalizada", queue_draft: "Draft", queue_solo: "Ranked Solo", queue_flex: "Ranked Flex",
    queue_blind: "A Ciegas", queue_aram: "ARAM", queue_arena: "Arena", queue_urf: "URF", queue_coop: "Co-op vs IA",
    queue_unknown: "Desconocido", ingame: "En Partida", playing: "Jugando", spectate_btn: "Espectar",
    // New Additions
    waiting_for_match: "Esperando partida...", enter_game_live: "Por favor, entra a partida para ver stats.", toggle_hint: "[CTRL+X] PARA ALTERNAR",
    team_blue: "Orden (Azul)", team_red: "Caos (Rojo)", you: "TÃƒÅ¡", hot_streak: "RACHA",
    matchup_analysis: "AnÃƒÂ¡lisis de Matchup", strategic_insight: "Insight EstratÃƒÂ©gico", counter_items: "Objetos Contra Recomendados",
    esports_center: "Centro Esports", switch_source: "Cambiar Fuente", upcoming_matches: "Partidos PrÃƒÂ³ximos", latest_news: "ÃƒÅ¡ltimas Noticias",
    collections_title: "Colecciones", rankings_title: "Clasificaciones", overlay_settings: "Ajustes Overlay",
    ingame_modules: "MÃƒÂ³dulos en Juego", launch_custom: "Lanza una personalizada para configurar.", start_editor: "Iniciar Editor Overlay",
    select_champion: "Seleccionar CampeÃƒÂ³n", search_champion: "Buscar...",
    rank_header: "Rango", lp_header: "LP", winrate_header: "Winrate", games_header: "Partidas", summoner_header: "Invocador",
    no_games_found: "No se encontraron partidas", search_summoner_profile: "Buscar perfil de invocador", search_result: "Buscar",
    most_kills: "MÃƒÂ¡s Kills", dmg_dealt: "daÃƒÂ±o infligido", vision_score: "PuntuaciÃƒÂ³n VisiÃƒÂ³n", cs_min: "CS / min", season_best: "MEJOR TEMPORADA",
    aggression: "Agresividad", farming: "Farm", vision_radar: "VisiÃƒÂ³n", survival: "Supervivencia", objective: "Objetivo",
    playstyle: "Estilo", focus: "Foco", aggressive_carry: "Carry Agresivo", die_less: "Morir Menos",
    skill_levelup: "Orden Habilidades", jungle_timers: "Timers Jungla", objective_voting: "VotaciÃƒÂ³n Objetivos", gold_diff: "Diferencia de Oro",
    skill_desc: "Muestra orden de habilidades en HUD", jungle_desc: "Overlay minimapa para campos", voting_desc: "Seguimiento de votos de equipo", gold_desc: "EstimaciÃƒÂ³n diff oro",
    last_20_games: "ÃƒÅ¡ltimas 20 Partidas", summoner_not_found: "Invocador No Encontrado",
    strategic_desc_mock: "Irelia tiene ventaja significativa al nivel 2. Busca intercambios pronto. Evita a Darius cuando tiene la E. Construye Hoja del Rey Arruinado primero.",
    search_hint: "Search Name#Tag (Region Locked)",
    region: "Region",
    online: "Online", offline: "Offline",
    edit_layout: "Ãƒâ€°diter Layout", save_layout: "Sauvegarder",
    gold_sound_label: "Alerte Or (1200g)",
    gold_sound_desc: "Joue un son quand vous atteignez 1200 gold",
    test_mode_label: "Mode TEST Overlays",
    test_mode_desc: "Affiche tous les overlays pour test",
    edit_layout_desc: "Ajustez la position de chaque module sur votre ÃƒÂ©cran.",
    layout_editor_title: "Oracle Layout Editor",
    layout_editor_desc: "Glissez les modules pour les repositionner",
    game_space: "Espace de Jeu",
    cancel: "Annuler",
    confirm_reset: "RÃƒÂ©initialiser les positions des overlays ?",
    reset_default: "RÃƒÂ©initialiser les positions par dÃƒÂ©faut",
    ward_timer_desc: "Rappel pour placer vos balises de vision",
    // Build View
    build_runes_season: "Build, Runas Temporada", patch: "Parche", recommended_plus: "P+ Recomendado",
    summoner_spells: "Hechizos de Invocador", skill_order: "Orden de Habilidades",
    max_1st: "Max 1Ã‚Âº", max_2nd: "Max 2Ã‚Âº", max_3rd: "Max 3Ã‚Âº",
    boots_options: "Opciones de Botas", starters: "Objetos Iniciales", core_build_path: "Ruta de Build Principal",
    matchups_analysis: "AnÃƒÂ¡lisis de Matchups", strong_against: "Fuerte Contra", weak_against: "DÃƒÂ©bil Contra",
    rune_path: "Ruta de Runas", launch: "Lanzar", winrate_trend: "Tendencia Winrate (30 DÃƒÂ­as)",
    // Matchup View
    matchup_analysis_title: "AnÃƒÂ¡lisis de Matchup",
    lane_kill_rate: "Tasa Kill LÃƒÂ­nea", gold_15: "Oro @ 15 min", early_wr: "Winrate Temprano", late_wr: "Winrate TardÃƒÂ­o", first_tower: "Primera Torre",
    analysis_direct: "AnÃƒÂ¡lisis Directo", duel_vs: "Duelo vs", guide_matchup: "GuÃƒÂ­a de Matchup", rival: "RIVAL",
    searching: "Buscando...", sync_data: "Sinc...", coach_verdict: "Veredicto TÃƒÂ©cnico", view_tips: "Ver Consejos", back_btn: "Volver", matchup_tips_title: "Consejos Matchup",
    // Esports View
    // esports_center: "Centro Esports", switch_source: "Cambiar Fuente", upcoming_matches: "PrÃƒÂ³ximos Partidos", latest_news: "ÃƒÅ¡ltimas Noticias", // Removed duplicate
    // esports_center: "Centro Esports", switch_source: "Cambiar Fuente", upcoming_matches: "PrÃƒÂ³ximos Partidos", latest_news: "ÃƒÅ¡ltimas Noticias",

    // Profile & Replays
    profile_not_found: "Perfil No Encontrado", summoner_not_found_desc: "Jugador no encontrado o no existe en esta regiÃƒÂ³n.",
    recent_matches: "Partidas Recientes", no_match_found: "No se encontraron partidas...", phase_label: "Fase",
    no_partners: "Sin jugadores recientes", games_played: "Partidas jugadas", top_champions: "Mejores Campeones", recent_players: "Jugadores Recientes",
    loading_replays: "Cargando replays...", and_ai_coaching: "& Coaching IA", replays_desc: "Mira tus partidas y recibe consejos personalizados.",
    games_found: "Partidas encontradas", watchable: "Visualizables", ai_analyzer_title: "Analizador IA Oracle",
    ai_analyzer_desc: "Selecciona una partida para generar un reporte completo.",
    analyzing_caps: "ANALIZANDO...", close_duel: "Cerrar Duelo", analyze_duel: "Analizar Duelo", opponent: "Oponente",
    sync_data_opp: "Sincronizando...", key_tips: "Consejos Clave", analysis_timeline: "CronologÃƒÂ­a", events: "EVENTOS",
    tactical_analysis: "AnÃƒÂ¡lisis tÃƒÂ¡ctico...", watch_replay: "Ver Replay",
    stat_obj_focus: "Foco Objetivos", stat_mechanics: "MecÃƒÂ¡nicas", stat_kda_perf: "Rend. KDA", stat_farming: "Farming",
    matchup_desc_example: "tiene ventaja significativa a nivel 2. Busca intercambios.",
    // Tips
    tip_deaths_title: "Muertes Excesivas", tip_deaths_desc: "Tasa de mortalidad alta.",
    tip_survival_title: "Supervivencia Perfecta", tip_survival_desc: "Ninguna muerte concedida.",
    tip_csm_title: "DÃƒÂ©ficit de Farm", tip_csm_desc: "CS/min crÃƒÂ­tico. Prioriza sÃƒÂºbditos.",
    tip_multikill_title: "Multi-Kill", tip_multikill_desc: "Gran gestiÃƒÂ³n de peleas.",
    tip_vision_elite_title: "VisiÃƒÂ³n Ãƒâ€°lite", tip_vision_elite_desc: "Control de mapa superior.",
    tip_vision_poor_title: "Ceguera de Mapa", tip_vision_poor_desc: "PuntuaciÃƒÂ³n de visiÃƒÂ³n baja.",
    tip_firstblood_title: "Primera Sangre", tip_firstblood_desc: "Gran ventaja temprana.",
    tip_objective_title: "Foco Objetivos", tip_objective_desc: "PresiÃƒÂ³n en Torres/Dragones.",
    tip_cc_title: "Maestro del CC", tip_cc_desc: "Excelente uso de control.",
    tip_gold_title: "CapitalizaciÃƒÂ³n Eco", tip_gold_desc: "GeneraciÃƒÂ³n masiva de oro.",
    tip_tank_title: "Resiliencia Absoluta", tip_tank_desc: "Gran mitigaciÃƒÂ³n de daÃƒÂ±o.",
    tip_jungle_title: "Ritmo de Jungla", tip_jungle_desc: "Limpieza muy lenta.",
    tip_default_title: "OptimizaciÃƒÂ³n Oro", tip_default_desc: "ConcÃƒÂ©ntrate en farmear.",
    // Verdicts
    verdict_pivot: "Oracle : Pivote EstratÃƒÂ©gico. Fuiste el motor de tu equipo. Tu participaciÃƒÂ³n definiÃƒÂ³ el ritmo del partido. Estuviste en todas partes, convirtiendo escaramuzas en ventajas globales.",
    verdict_soul: "Oracle : Segador de Almas. Dominio EconÃƒÂ³mico. No solo ganaste tu lÃƒÂ­nea; llevaste a la bancarrota a tu oponente. Al negar recursos, hiciste que el enemigo fuera irrelevante.",
    verdict_fatal: "Oracle : Eficiencia Fatal. PrecisiÃƒÂ³n QuirÃƒÂºrgica. Maximizaste cada moneda de oro gastada. Tu daÃƒÂ±o en comparaciÃƒÂ³n con tu economÃƒÂ­a fue excepcional. No necesitas build completa para ser letal.",
    verdict_pillar: "Oracle : Pilar de Victoria. La Roca. Fuiste la base confiable que tu equipo necesitaba. Tu presencia en momentos clave y tu juego macro sÃƒÂ³lido aseguraron la victoria.",
    verdict_vuln: "Oracle : Carga. Pasaste mÃƒÂ¡s tiempo muerto que impactando el mapa. Tus errores de posicionamiento regalaron oro y ritmo. Deja de forzar jugadas cuando vas por detrÃƒÂ¡s.",
    verdict_eco: "Oracle : Asfixia EconÃƒÂ³mica. Hambre de Recursos. Fallaste en lo bÃƒÂ¡sico: el farm. Pelear con desventaja de objetos es una estrategia perdedora. Prioriza las oleadas de sÃƒÂºbditos.",
    verdict_leader: "Oracle : Lobo Solitario. Jugaste bien individualmente, pero no tradujiste tu ventaja al equipo. El KDA no destruye el Nexo. Necesitabas usar tu fuerza para cubrir a tus aliados.",
    verdict_defeat: "Oracle : Colapso Macro. MecÃƒÂ¡nicamente decente, pero perdiste el mapa. Dejaste que el enemigo dictara las rotaciones. Revisa tu toma de decisiones en el juego medio.",
    verdict_intro: "Oracle :",
    profile_not_found_title: "Perfil No Encontrado",
    profile_not_found_desc: "El jugador no se encuentra o no existe en esta regiÃƒÂ³n.",
    others: "Otros",
  },
  pt: {
    overview: "VisÃƒÂ£o Geral", champions: "CampeÃƒÂµes", prohub: "Hub Pro", draft: "Draft", live: "Ao Vivo",
    profile: "Perfil", settings: "ConfiguraÃƒÂ§ÃƒÂµes", connected: "Conectado", disconnected: "Desconectado",
    searchPlaceholder: "Buscar invocador...", visualStyle: "Estilo Visual", colorTheme: "Tema de Cor",
    language: "Idioma", startup: "Iniciar com Windows", glass: "Vidro", opaque: "Opaco",
    themeToggle: "Alternar Claro/Escuro", chooseStyle: "Escolha entre Vidro ou SÃƒÂ³lido",
    chooseLang: "Selecione seu idioma", startupDesc: "Iniciar Oracle com o Windows",
    metaTierList: "Meta Tier List", proReplays: "Replays Pro", waitingMatch: "Aguardando partida",
    clientDisconnected: "Cliente Desconectado", liveMatch: "PARTIDA AO VIVO",
    rank: "Rank", champion: "CampeÃƒÂ£o", role: "Rota", winrate: "VitÃƒÂ³rias", ban: "Banimentos", tier: "Tier",
    kda: "KDA", dpmScore: "Oracle Score", kp: "KP", csm: "CSM", vision: "PontuaÃƒÂ§ÃƒÂ£o de VisÃƒÂ£o", gpm: "GPM",
    goldDiff15: "Dif. Ouro @ 15", kaDiff15: "Dif. K+A @ 15", soloKills: "Abates Solo",
    match_history: "HistÃƒÂ³rico de Partidas", records: "Registros", coming_soon: "Em breve...",
    behavioral: "Comportamental", lens: "Oracle Lens", performance: "Desempenho por campeÃƒÂ£o", pings: "Pings Totais",
    all: "Todos",
    explore_oracle: "Explorar App ORACLE", season: "Temporada 15", owned_skins: "Skins obtidos",
    survivability: "SobrevivÃƒÂªncia", tf_deaths: "Mortes em Teamfight",
    mvp: "MVP", score: "pontuaÃƒÂ§ÃƒÂ£o", deaths: "Mortes", ka: "Abates + AssistÃƒÂªncias",
    early: "CEDO", mid: "MEIO", late: "FIM", live_pro: "AO VIVO PRO", spectate: "Assistir",
    replay: "REPLAY", victory: "VitÃƒÂ³ria", defeat: "Derrota", theme_dark: "Escuro", theme_light: "Claro",
    visual_glass: "Vidro", visual_opaque: "Opaco",
    solo_duo: "Solo/Duo", flex: "Flex", aram: "ARAM",
    appearance: "AparÃƒÂªncia", chooseStyleDesc: "Escolha entre Vidro ou SÃƒÂ³lido",
    themeToggleDesc: "Alternar entre modo Claro e Escuro",
    langSelectDesc: "Selecione seu idioma preferido",
    connectLcu: "Conectando ao Cliente...", vs1w: "vs 1 sem atrÃƒÂ¡s",
    cat_core: "ORACLE CORE", cat_app: "ORACLE APP", cat_insights: "ORACLE INSIGHTS",
    dashboard: "VisÃƒÂ£o Geral", tierlist: "Builds & Tips", leaderboards: "Rankings",
    replays: "Replays", overlays: "Overlays", collections: "ColeÃƒÂ§ÃƒÂµes",
    esports: "Esports", datastudio: "Data Studio", matchups: "Matchups",
    watch: "Assistir",
    // Game Modes & Status
    queue_custom: "Personalizada", queue_draft: "Draft", queue_solo: "Ranked Solo", queue_flex: "Ranked Flex",
    queue_blind: "Ãƒâ‚¬s Cegas", queue_aram: "ARAM", queue_arena: "Arena", queue_urf: "URF", queue_coop: "Co-op vs IA",
    queue_unknown: "Desconhecido", ingame: "Em Jogo", playing: "Jogando", spectate_btn: "Assistir",
    // New Additions
    waiting_for_match: "Aguardando partida...", enter_game_live: "Por favor, entre em uma partida para ver estatÃƒÂ­sticas.", toggle_hint: "[CTRL+X] PARA ALTERNAR",
    team_blue: "Ordem (Azul)", team_red: "Caos (Vermelho)", you: "VOCÃƒÅ ", hot_streak: "SÃƒâ€°RIE",
    matchup_analysis: "AnÃƒÂ¡lise de Matchup", strategic_insight: "Insight EstratÃƒÂ©gico", counter_items: "Itens Counter Recomendados",
    esports_center: "Centro de Esports", switch_source: "Trocar Fonte", upcoming_matches: "PrÃƒÂ³ximas Partidas", latest_news: "ÃƒÅ¡ltimas NotÃƒÂ­cias",
    collections_title: "ColeÃƒÂ§ÃƒÂµes", rankings_title: "Rankings", overlay_settings: "ConfiguraÃƒÂ§ÃƒÂµes de Overlay",
    ingame_modules: "MÃƒÂ³dulos no Jogo", launch_custom: "Inicie uma personalizada para configurar.", start_editor: "Iniciar Editor de Overlay",
    select_champion: "Selecionar CampeÃƒÂ£o", search_champion: "Buscar...",
    rank_header: "Rank", lp_header: "PdL", winrate_header: "VitÃƒÂ³rias", games_header: "Partidas", summoner_header: "Invocador",
    no_games_found: "Nenhuma partida encontrada", search_summoner_profile: "Buscar perfil de invocador", search_result: "Buscar",
    most_kills: "Mais Abates", dmg_dealt: "Dano Causado", vision_score: "Placar de VisÃƒÂ£o", cs_min: "CS / min", season_best: "MELHOR TEMPORADA",
    aggression: "Agressividade", farming: "Farm", vision_radar: "VisÃƒÂ£o", survival: "SobrevivÃƒÂªncia", objective: "Objetivo",
    playstyle: "Estilo de Jogo", focus: "Foco", aggressive_carry: "Carry Agressivo", die_less: "Morrer Menos",
    skill_levelup: "Ordem de Habilidades", jungle_timers: "Timers da Jungle", objective_voting: "VotaÃƒÂ§ÃƒÂ£o de Objetivos", gold_diff: "DiferenÃƒÂ§a de Ouro",
    skill_desc: "Mostra ordem das habilidades no HUD", jungle_desc: "Overlay do minimapa para campos", voting_desc: "Rastreamento de votos da equipe", gold_desc: "Estimativa de diferenÃƒÂ§a de ouro",
    last_20_games: "ÃƒÅ¡ltimas 20 Partidas", summoner_not_found: "Invocador NÃƒÂ£o Encontrado",
    strategic_desc_mock: "Irelia tem uma vantagem significativa no nÃƒÂ­vel 2. Procure trocas cedo. Evite Darius quando o E dele estiver disponÃƒÂ­vel. FaÃƒÂ§a Espada do Rei DestruÃƒÂ­do primeiro.",
    search_hint: "Buscar Nome#Tag (RegiÃƒÂ£o Bloqueada)",
    region: "RegiÃƒÂ£o",
    online: "Online", offline: "Offline",
    // Build View
    build_runes_season: "Build, Runas Temporada", patch: "Patch", recommended_plus: "P+ Recomendado",
    summoner_spells: "FeitiÃƒÂ§os de Invocador", skill_order: "Ordem de Habilidades",
    max_1st: "Max 1Ã‚Âº", max_2nd: "Max 2Ã‚Âº", max_3rd: "Max 3Ã‚Âº",
    boots_options: "OpÃƒÂ§ÃƒÂµes de Botas", starters: "Itens Iniciais", core_build_path: "Caminho de Build Principal",
    matchups_analysis: "AnÃƒÂ¡lise de Matchups", strong_against: "Forte Contra", weak_against: "Fraco Contra",
    rune_path: "Caminho de Runas", launch: "LanÃƒÂ§.", winrate_trend: "TendÃƒÂªncia Winrate (30 Dias)",
    // Matchup View
    matchup_analysis_title: "AnÃƒÂ¡lise de Matchup",
    lane_kill_rate: "Taxa de Abate na Rota", gold_15: "Ouro @ 15 min", early_wr: "Winrate Inicial", late_wr: "Winrate Final", first_tower: "Primeira Torre",
    analysis_direct: "AnÃƒÂ¡lise Direta", duel_vs: "Duelo contra", guide_matchup: "Guia de Matchup", rival: "RIVAL",
    searching: "Buscando...", sync_data: "Sincronizando...", coach_verdict: "Veredito TÃƒÂ©cnico", view_tips: "Ver Dicas", back_btn: "Voltar", matchup_tips_title: "Dicas de Matchup",
    // Profile & Replays
    profile_not_found: "Perfil NÃƒÂ£o Encontrado", summoner_not_found_desc: "Jogador nÃƒÂ£o encontrado ou nÃƒÂ£o existe nesta regiÃƒÂ£o.",
    recent_matches: "Partidas Recentes", no_match_found: "Nenhuma partida encontrada...", phase_label: "Fase",
    no_partners: "Sem jogadores recentes", games_played: "Jogos", top_champions: "Melhores CampeÃƒÂµes", recent_players: "Jogadores Recentes",
    loading_replays: "Carregando replays...", and_ai_coaching: "& Coaching IA", replays_desc: "Assista seus jogos e receba dicas personalizadas.",
    games_found: "Jogos encontrados", watchable: "AssistÃƒÂ­veis", ai_analyzer_title: "Analisador IA Oracle",
    ai_analyzer_desc: "Selecione um jogo para gerar um relatÃƒÂ³rio completo.",
    analyzing_caps: "ANALISANDO...", close_duel: "Fechar Duelo", analyze_duel: "Analisar Duelo", opponent: "Oponente",
    sync_data_opp: "Sincronizando...", key_tips: "Dicas Chave", analysis_timeline: "Linha do Tempo", events: "EVENTOS",
    tactical_analysis: "AnÃƒÂ¡lise tÃƒÂ¡tica...", watch_replay: "Ver Replay",
    stat_obj_focus: "Foco Objetivos", stat_mechanics: "MecÃƒÂ¢nicas", stat_kda_perf: "Perf. KDA", stat_farming: "Farming",
    matchup_desc_example: "tem vantagem significativa no nÃƒÂ­vel 2. Busque trocas cedo.",
    // Tips
    tip_deaths_title: "Mortes Excessivas", tip_deaths_desc: "Taxa de mortalidade alta.",
    tip_survival_title: "SobrevivÃƒÂªncia Perfeita", tip_survival_desc: "Nenhuma morte. Posicionamento perfeito.",
    tip_csm_title: "DÃƒÂ©ficit de Farm", tip_csm_desc: "CS/min crÃƒÂ­tico. Priorize minions.",
    tip_multikill_title: "Multi-Kill", tip_multikill_desc: "Ãƒâ€œtima gestÃƒÂ£o de luta.",
    tip_vision_elite_title: "VisÃƒÂ£o Elite", tip_vision_elite_desc: "Controle de mapa superior.",
    tip_vision_poor_title: "Cegueira de Mapa", tip_vision_poor_desc: "Baixa pontuaÃƒÂ§ÃƒÂ£o de visÃƒÂ£o.",
    tip_firstblood_title: "First Blood", tip_firstblood_desc: "Grande vantagem inicial.",
    tip_objective_title: "Foco Objetivos", tip_objective_desc: "PressÃƒÂ£o em Torres/DragÃƒÂµes.",
    tip_cc_title: "Mestre do CC", tip_cc_desc: "Uso excelente de controle.",
    tip_gold_title: "CapitalizaÃƒÂ§ÃƒÂ£o Eco", tip_gold_desc: "GeraÃƒÂ§ÃƒÂ£o massiva de ouro.",
    tip_tank_title: "ResiliÃƒÂªncia Absoluta", tip_tank_desc: "Grande mitigaÃƒÂ§ÃƒÂ£o de dano.",
    tip_jungle_title: "Ritmo de Jungle", tip_jungle_desc: "Limpeza muito lenta.",
    tip_default_title: "OtimizaÃƒÂ§ÃƒÂ£o Ouro", tip_default_desc: "Foque em farmar.",
    // Verdicts
    verdict_pivot: "Oracle : PivÃƒÂ´ EstratÃƒÂ©gico. VocÃƒÂª foi o motor do seu time. Sua participaÃƒÂ§ÃƒÂ£o definiu o ritmo da partida. VocÃƒÂª estava em todos os lugares, transformando escaramuÃƒÂ§as em vantagens globais.",
    verdict_soul: "Oracle : Ceifador de Almas. DomÃƒÂ­nio EconÃƒÂ´mico. VocÃƒÂª nÃƒÂ£o apenas venceu sua rota; levou seu oponente ÃƒÂ  falÃƒÂªncia. Ao negar recursos, vocÃƒÂª tornou o inimigo irrelevante.",
    verdict_fatal: "Oracle : EficiÃƒÂªncia Fatal. PrecisÃƒÂ£o CirÃƒÂºrgica. VocÃƒÂª maximizou cada moeda de ouro gasta. Seu dano comparado ÃƒÂ  sua economia foi excepcional. NÃƒÂ£o precisa de build completa para ser letal.",
    verdict_pillar: "Oracle : Pilar da VitÃƒÂ³ria. A Rocha. VocÃƒÂª foi a base confiÃƒÂ¡vel que seu time precisava. Sua presenÃƒÂ§a em momentos cruciais e macro jogo sÃƒÂ³lido garantiram a vitÃƒÂ³ria.",
    verdict_vuln: "Oracle : Fardo. VocÃƒÂª passou mais tempo morto do que impactando o mapa. Seus erros de posicionamento deram ouro e ritmo de graÃƒÂ§a. Pare de forÃƒÂ§ar jogadas quando estiver atrÃƒÂ¡s.",
    verdict_eco: "Oracle : Asfixia EconÃƒÂ´mica. Fome de Recursos. VocÃƒÂª falhou no bÃƒÂ¡sico: farm. Lutar com desvantagem de itens ÃƒÂ© uma estratÃƒÂ©gia perdedora. Priorize as ondas de minions.",
    verdict_leader: "Oracle : Lobo SolitÃƒÂ¡rio. Jogou bem individualmente, mas nÃƒÂ£o traduziu sua vantagem para o time. KDA nÃƒÂ£o destrÃƒÂ³i o Nexus. Use sua forÃƒÂ§a para cobrir seus aliados.",
    verdict_defeat: "Oracle : Colapso Macro. Mecanicamente decente, mas perdeu o mapa. VocÃƒÂª deixou o inimigo ditar as rotaÃƒÂ§ÃƒÂµes. Revise suas decisÃƒÂµes no meio do jogo.",
    verdict_intro: "Oracle :",
    profile_not_found_title: "Perfil NÃƒÂ£o Encontrado",
    profile_not_found_desc: "O jogador nÃƒÂ£o foi encontrado ou nÃƒÂ£o existe nesta regiÃƒÂ£o.",
    others: "Outros",
  },
  de: {
    overview: "ÃƒÅ“bersicht", champions: "Champions", prohub: "Pro Hub", draft: "Draft", live: "Live",
    profile: "Profil", settings: "Einstellungen", connected: "Verbunden", disconnected: "Getrennt",
    searchPlaceholder: "BeschwÃƒÂ¶rer suchen...", visualStyle: "Visueller Stil", colorTheme: "Farbthema",
    language: "Sprache", startup: "Beim Start ÃƒÂ¶ffnen", glass: "Glas", opaque: "Undurchsichtig",
    themeToggle: "Hell/Dunkel umschalten", chooseStyle: "Visuelles Erscheinungsbild",
    chooseLang: "WÃƒÂ¤hlen Sie Ihre Sprache", startupDesc: "Automatisches Startverhalten",
    metaTierList: "Meta Tier List", proReplays: "Pro Replays", waitingMatch: "Warte auf Match",
    clientDisconnected: "Client Getrennt", liveMatch: "LIVE MATCH",
    rank: "Rang", champion: "Champion", role: "Rolle", winrate: "Siegesrate", ban: "Bannrate", tier: "Tier",
    kda: "KDA", dpmScore: "Oracle Score", kp: "KP", csm: "CSM", vision: "Sichtwertung", gpm: "GPM",
    goldDiff15: "Gold-Diff @ 15", kaDiff15: "K+A-Diff @ 15", soloKills: "Solo-Kills",
    match_history: "Spielverlauf", records: "Aufzeichnungen", coming_soon: "DemnÃƒÂ¤chst verfÃƒÂ¼gbar...",
    behavioral: "Verhalten", lens: "Oracle Lens", performance: "Leistung nach Champion", pings: "Gesamt-Pings",
    all: "Alle",
    explore_oracle: "Erkunden Sie ORACLE", season: "Saison 15", owned_skins: "Besitzte Skins",
    survivability: "ÃƒÅ“berlebensfÃƒÂ¤higkeit", tf_deaths: "Teamfight-Tode",
    mvp: "MVP", score: "Punktzahl", deaths: "Tode", ka: "Kills + Assists",
    early: "FRÃƒÅ“H", mid: "MITTE", late: "SPÃƒâ€žT", live_pro: "LIVE PRO", spectate: "Zuschauen",
    replay: "WIEDERHOLUNG", victory: "Sieg", defeat: "Niederlage", theme_dark: "Dunkel", theme_light: "Hell",
    visual_glass: "Glas", visual_opaque: "Undurchsichtig", solo_duo: "Solo/Duo", flex: "Flex", aram: "ARAM",
    appearance: "Aussehen", chooseStyleDesc: "WÃƒÂ¤hlen Sie zwischen Glas oder Solid",
    themeToggleDesc: "Zwischen Hell- und Dunkelmodus wechseln",
    langSelectDesc: "WÃƒÂ¤hlen Sie Ihre Sprache",
    connectLcu: "Verbinde mit League Client...", vs1w: "vs vor 1 Woche",
    search_hint: "Suche Name#Tag", region: "Region",
    online: "Online", offline: "Offline",
    build_runes_season: "Build, Runen Saison", patch: "Patch", recommended_plus: "P+ Empfohlen",
    summoner_spells: "BeschwÃƒÂ¶rerzauber", skill_order: "FÃƒÂ¤higkeiten-Reihenfolge",
    max_1st: "Max 1.", max_2nd: "Max 2.", max_3rd: "Max 3.",
    boots_options: "Stiefel-Optionen", starters: "StartgegenstÃƒÂ¤nde", core_build_path: "Immer bauen",
    matchups_analysis: "Matchup-Analyse", strong_against: "Stark gegen", weak_against: "Schwach gegen",
    rune_path: "Runenpfad", launch: "Start", winrate_trend: "Siegesrate Trend",
    matchup_analysis_title: "Matchup-Analyse",
    lane_kill_rate: "Lane Kill-Rate", gold_15: "Gold @ 15 Min", early_wr: "Siegquote (FrÃƒÂ¼h)", late_wr: "Siegquote (SpÃƒÂ¤t)", first_tower: "Erster Turm",
    select_champion: "Champion wÃƒÂ¤hlen", search_champion: "Suche...", strategic_insight: "Strategische Einsicht", counter_items: "Counter Items",
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
    goldDiff15: "Raznitsa zolota @ 15", kaDiff15: "Raznitsa U+S @ 15", soloKills: "Solo ubiytsa",
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
    overview: "Ã¦Â¦â€šÃ¨Â¦Â", champions: "Ã£Æ’ÂÃ£Æ’Â£Ã£Æ’Â³Ã£Æ’â€Ã£â€šÂªÃ£Æ’Â³", prohub: "Ã£Æ’â€”Ã£Æ’Â­Ã£Æ’ÂÃ£Æ’â€“", draft: "Ã£Æ’â€°Ã£Æ’Â©Ã£Æ’â€¢Ã£Æ’Ë†", live: "Ã£Æ’Â©Ã£â€šÂ¤Ã£Æ’â€“",
    profile: "Ã£Æ’â€”Ã£Æ’Â­Ã£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â¼Ã£Æ’Â«", settings: "Ã¨Â¨Â­Ã¥Â®Å¡", connected: "Ã¦Å½Â¥Ã§Â¶Å¡Ã¦Â¸Ë†Ã£ÂÂ¿", disconnected: "Ã¦Å“ÂªÃ¦Å½Â¥Ã§Â¶Å¡",
    searchPlaceholder: "Ã£â€šÂµÃ£Æ’Â¢Ã£Æ’Å Ã£Æ’Â¼Ã¦Â¤Å“Ã§Â´Â¢...", visualStyle: "Ã£Æ’â€œÃ£â€šÂ¸Ã£Æ’Â¥Ã£â€šÂ¢Ã£Æ’Â«", colorTheme: "Ã£Æ’â€ Ã£Æ’Â¼Ã£Æ’Å¾",
    language: "Ã¨Â¨â‚¬Ã¨ÂªÅ¾", startup: "Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Ë†Ã£â€šÂ¢Ã£Æ’Æ’Ã£Æ’â€”", glass: "Ã£â€šÂ¬Ã£Æ’Â©Ã£â€šÂ¹", opaque: "Ã¤Â¸ÂÃ©â‚¬ÂÃ¦ËœÅ½",
    themeToggle: "Ã£Æ’Â©Ã£â€šÂ¤Ã£Æ’Ë†/Ã£Æ’â‚¬Ã£Æ’Â¼Ã£â€šÂ¯Ã¥Ë†â€¡Ã¦â€ºÂ¿", chooseStyle: "Ã£â€šÂ¹Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’Â«Ã£â€šâ€™Ã©ÂÂ¸Ã¦Å Å¾",
    chooseLang: "Ã¨Â¨â‚¬Ã¨ÂªÅ¾Ã£â€šâ€™Ã©ÂÂ¸Ã¦Å Å¾", startupDesc: "WindowsÃ¨ÂµÂ·Ã¥â€¹â€¢Ã¦â„¢â€šÃ£ÂÂ«Ã¥Â®Å¸Ã¨Â¡Å’",
    metaTierList: "Ã£Æ’Â¡Ã£â€šÂ¿Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¢Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†", proReplays: "Ã£Æ’â€”Ã£Æ’Â­Ã£Æ’ÂªÃ£Æ’â€”Ã£Æ’Â¬Ã£â€šÂ¤", waitingMatch: "Ã£Æ’Å¾Ã£Æ’Æ’Ã£Æ’ÂÃ¥Â¾â€¦Ã¦Â©Å¸Ã¤Â¸Â­",
    clientDisconnected: "Ã£â€šÂ¯Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¢Ã£Æ’Â³Ã£Æ’Ë†Ã¦Å“ÂªÃ¦Å½Â¥Ã§Â¶Å¡", liveMatch: "Ã£Æ’Â©Ã£â€šÂ¤Ã£Æ’â€“Ã£Æ’Å¾Ã£Æ’Æ’Ã£Æ’Â",
    rank: "Ã£Æ’Â©Ã£Æ’Â³Ã£â€šÂ¯", champion: "Ã£Æ’ÂÃ£Æ’Â£Ã£Æ’Â³Ã£Æ’â€Ã£â€šÂªÃ£Æ’Â³", role: "Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’Â«", winrate: "Ã¥â€¹ÂÃ§Å½â€¡", ban: "Ã£Æ’ÂÃ£Æ’Â³Ã§Å½â€¡", tier: "Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¢",
    kda: "KDA", dpmScore: "OracleÃ£â€šÂ¹Ã£â€šÂ³Ã£â€šÂ¢", kp: "KP", csm: "CSM", vision: "Ã¨Â¦â€“Ã§â€¢Å’Ã£â€šÂ¹Ã£â€šÂ³Ã£â€šÂ¢", gpm: "GPM",
    goldDiff15: "15Ã¥Ë†â€ Ã¦â„¢â€šÃ§â€šÂ¹Ã£â€šÂ´Ã£Æ’Â¼Ã£Æ’Â«Ã£Æ’â€°Ã¥Â·Â®", kaDiff15: "15Ã¥Ë†â€ Ã¦â„¢â€šÃ§â€šÂ¹K+AÃ¥Â·Â®", soloKills: "Ã£â€šÂ½Ã£Æ’Â­Ã£â€šÂ­Ã£Æ’Â«",
    match_history: "Ã¨Â©Â¦Ã¥ÂË†Ã¥Â±Â¥Ã¦Â­Â´", records: "Ã¨Â¨ËœÃ©Å’Â²", coming_soon: "Ã¨Â¿â€˜Ã¦â€”Â¥Ã¥â€¦Â¬Ã©â€“â€¹...",
    behavioral: "Ã¨Â¡Å’Ã¥â€¹â€¢", lens: "OracleÃ£Æ’Â¬Ã£Æ’Â³Ã£â€šÂº", performance: "Ã£Æ’ÂÃ£Æ’Â£Ã£Æ’Â³Ã£Æ’â€Ã£â€šÂªÃ£Æ’Â³Ã¥Ë†Â¥Ã£Æ’â€˜Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Å¾Ã£Æ’Â³Ã£â€šÂ¹", pings: "Ã¥ÂË†Ã¨Â¨Ë†Ã£Æ’â€Ã£Æ’Â³Ã£â€šÂ°",
    all: "Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦",
    explore_oracle: "OracleÃ£â€šÂ¢Ã£Æ’â€”Ã£Æ’ÂªÃ£â€šâ€™Ã¦Å½Â¢Ã§Â´Â¢", season: "Ã£â€šÂ·Ã£Æ’Â¼Ã£â€šÂºÃ£Æ’Â³15", owned_skins: "Ã¦â€°â‚¬Ã¦Å’ÂÃ£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â³",
    survivability: "Ã§â€Å¸Ã¥Â­ËœÃ§Å½â€¡", tf_deaths: "Ã©â€ºâ€ Ã¥â€ºÂ£Ã¦Ë†Â¦Ã£Æ’â€¡Ã£â€šÂ¹",
    mvp: "MVP", score: "Ã£â€šÂ¹Ã£â€šÂ³Ã£â€šÂ¢", deaths: "Ã£Æ’â€¡Ã£â€šÂ¹", ka: "Ã£â€šÂ­Ã£Æ’Â« + Ã£â€šÂ¢Ã£â€šÂ·Ã£â€šÂ¹Ã£Æ’Ë†",
    early: "Ã¥ÂºÂÃ§â€ºÂ¤", mid: "Ã¤Â¸Â­Ã§â€ºÂ¤", late: "Ã§Âµâ€šÃ§â€ºÂ¤", live_pro: "Ã£Æ’Â©Ã£â€šÂ¤Ã£Æ’â€“Ã£Æ’â€”Ã£Æ’Â­", spectate: "Ã¨Â¦Â³Ã¦Ë†Â¦",
    replay: "Ã£Æ’ÂªÃ£Æ’â€”Ã£Æ’Â¬Ã£â€šÂ¤", victory: "Ã¥â€¹ÂÃ¥Ë†Â©", defeat: "Ã¦â€¢â€”Ã¥Å’â€”", theme_dark: "Ã£Æ’â‚¬Ã£Æ’Â¼Ã£â€šÂ¯", theme_light: "Ã£Æ’Â©Ã£â€šÂ¤Ã£Æ’Ë†",
    visual_glass: "Ã£â€šÂ¬Ã£Æ’Â©Ã£â€šÂ¹", visual_opaque: "Ã¤Â¸ÂÃ©â‚¬ÂÃ¦ËœÅ½",
    appearance: "Ã¥Â¤â€“Ã¨Â¦Â³", chooseStyleDesc: "Ã£â€šÂ¬Ã£Æ’Â©Ã£â€šÂ¹Ã£Ââ€¹Ã¤Â¸ÂÃ©â‚¬ÂÃ¦ËœÅ½Ã£Ââ€¹Ã£â€šâ€™Ã©ÂÂ¸Ã¦Å Å¾",
    themeToggleDesc: "Ã£Æ’Â©Ã£â€šÂ¤Ã£Æ’Ë†/Ã£Æ’â‚¬Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â¢Ã£Æ’Â¼Ã£Æ’â€°Ã¥Ë†â€¡Ã¦â€ºÂ¿",
    langSelectDesc: "Ã¨Â¨â‚¬Ã¨ÂªÅ¾Ã£â€šâ€™Ã©ÂÂ¸Ã¦Å Å¾Ã£Ââ€”Ã£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€ž",
    connectLcu: "Ã£â€šÂ¯Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¢Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ«Ã¦Å½Â¥Ã§Â¶Å¡Ã¤Â¸Â­...", vs1w: "1Ã©â‚¬Â±Ã©â€“â€œÃ¥â€°Â",
    cat_core: "ORACLE CORE", cat_app: "ORACLE APP", cat_insights: "ORACLE INSIGHTS",
    dashboard: "Ã¦Â¦â€šÃ¨Â¦Â", tierlist: "Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¢Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†", leaderboards: "Ã£Æ’Â©Ã£Æ’Â³Ã£â€šÂ­Ã£Æ’Â³Ã£â€šÂ°",
    replays: "Ã£Æ’ÂªÃ£Æ’â€”Ã£Æ’Â¬Ã£â€šÂ¤", overlays: "Ã£â€šÂªÃ£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Â¬Ã£â€šÂ¤", collections: "Ã£â€šÂ³Ã£Æ’Â¬Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³",
    esports: "eÃ£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’â€ž", datastudio: "Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šÂ¹Ã£â€šÂ¿Ã£â€šÂ¸Ã£â€šÂª", matchups: "Ã£Æ’Å¾Ã£Æ’Æ’Ã£Æ’ÂÃ£â€šÂ¢Ã£Æ’Æ’Ã£Æ’â€”",
    watch: "Ã¨Â¦Â³Ã¦Ë†Â¦"
  },
  ko: {
    overview: "ÃªÂ°Å“Ã¬Å¡â€", champions: "Ã¬Â±â€Ã­â€Â¼Ã¬â€“Â¸", prohub: "Ã­â€â€žÃ«Â¡Å“ Ã­â€”Ë†Ã«Â¸Å’", draft: "Ã«â€œÅ“Ã«Å¾ËœÃ­â€â€žÃ­Å Â¸", live: "Ã«ÂÂ¼Ã¬ÂÂ´Ã«Â¸Å’",
    profile: "Ã­â€â€žÃ«Â¡Å“Ã­â€¢â€ž", settings: "Ã¬â€žÂ¤Ã¬Â â€¢", connected: "Ã¬â€”Â°ÃªÂ²Â°Ã«ÂÂ¨", disconnected: "Ã¬â€”Â°ÃªÂ²Â° Ã«ÂÅ ÃªÂ¹â‚¬",
    searchPlaceholder: "Ã¬â€ Å’Ã­â„¢ËœÃ¬â€šÂ¬ ÃªÂ²â‚¬Ã¬Æ’â€°...", visualStyle: "Ã«Â¹â€žÃ¬Â£Â¼Ã¬â€“Â¼ Ã¬Å Â¤Ã­Æ’â‚¬Ã¬ÂÂ¼", colorTheme: "Ã­â€¦Å’Ã«Â§Ë†",
    language: "Ã¬â€“Â¸Ã¬â€“Â´", startup: "Ã¬â€¹Å“Ã¬Å¾â€˜ Ã­â€â€žÃ«Â¡Å“ÃªÂ·Â¸Ã«Å¾Â¨", glass: "ÃªÂ¸â‚¬Ã«Å¾ËœÃ¬Å Â¤", opaque: "Ã«Â¶Ë†Ã­Ë†Â¬Ã«Âªâ€¦",
    themeToggle: "Ã«ÂÂ¼Ã¬ÂÂ´Ã­Å Â¸/Ã«â€¹Â¤Ã­ÂÂ¬ Ã¬Â â€žÃ­â„¢Ëœ", chooseStyle: "Ã¬Å Â¤Ã­Æ’â‚¬Ã¬ÂÂ¼ Ã¬â€žÂ Ã­Æ’Â",
    chooseLang: "Ã¬â€“Â¸Ã¬â€“Â´ Ã¬â€žÂ Ã­Æ’Â", startupDesc: "Windows Ã¬â€¹Å“Ã¬Å¾â€˜ Ã¬â€¹Å“ Ã¬Å¾ÂÃ«Ââ„¢ Ã¬â€¹Â¤Ã­â€“â€°",
    metaTierList: "Ã«Â©â€Ã­Æ’â‚¬ Ã­â€¹Â°Ã¬â€“Â´ Ã«Â¦Â¬Ã¬Å Â¤Ã­Å Â¸", proReplays: "Ã­â€â€žÃ«Â¡Å“ Ã«Â¦Â¬Ã­â€Å’Ã«Â Ë†Ã¬ÂÂ´", waitingMatch: "Ã«Â§Â¤Ã¬Â¹Ëœ Ã«Å’â‚¬ÃªÂ¸Â° Ã¬Â¤â€˜",
    clientDisconnected: "Ã­ÂÂ´Ã«ÂÂ¼Ã¬ÂÂ´Ã¬â€“Â¸Ã­Å Â¸ Ã¬â€”Â°ÃªÂ²Â° Ã«ÂÅ ÃªÂ¹â‚¬", liveMatch: "Ã«ÂÂ¼Ã¬ÂÂ´Ã«Â¸Å’ Ã«Â§Â¤Ã¬Â¹Ëœ",
    rank: "Ã¬Ë†Å“Ã¬Å“â€ž", champion: "Ã¬Â±â€Ã­â€Â¼Ã¬â€“Â¸", role: "Ã¬â€”Â­Ã­â€¢Â ", winrate: "Ã¬Å Â¹Ã«Â¥Â ", ban: "Ã«Â°Â´Ã¬Å“Â¨", tier: "Ã­â€¹Â°Ã¬â€“Â´",
    kda: "KDA", dpmScore: "Oracle Ã¬Â ÂÃ¬Ë†Ëœ", kp: "KP", csm: "CSM", vision: "Ã¬â€¹Å“Ã¬â€¢Â¼ Ã¬Â ÂÃ¬Ë†Ëœ", gpm: "GPM",
    goldDiff15: "15Ã«Â¶â€ž ÃªÂ³Â¨Ã«â€œÅ“ Ã¬Â°Â¨Ã¬ÂÂ´", kaDiff15: "15Ã«Â¶â€ž K+A Ã¬Â°Â¨Ã¬ÂÂ´", soloKills: "Ã¬â€ â€Ã«Â¡Å“ Ã­â€šÂ¬",
    match_history: "ÃªÂ²Â½ÃªÂ¸Â° ÃªÂ¸Â°Ã«Â¡Â", records: "ÃªÂ¸Â°Ã«Â¡Â", coming_soon: "Ã¬Â¶Å“Ã¬â€¹Å“ Ã¬ËœË†Ã¬Â â€¢...",
    behavioral: "Ã­â€“â€°Ã«Ââ„¢", lens: "Oracle Ã«Â Å’Ã¬Â¦Ë†", performance: "Ã¬Â±â€Ã­â€Â¼Ã¬â€“Â¸Ã«Â³â€ž Ã¬â€žÂ±Ã«Å Â¥", pings: "Ã¬Â´Â Ã­â€¢â€˜",
    all: "Ã«ÂªÂ¨Ã«â€˜Â",
    explore_oracle: "Oracle Ã¬â€¢Â± Ã­Æ’ÂÃ¬Æ’â€°", season: "Ã¬â€¹Å“Ã¬Â¦Å’ 15", owned_skins: "Ã«Â³Â´Ã¬Å“Â  Ã¬Å Â¤Ã­â€šÂ¨",
    survivability: "Ã¬Æ’ÂÃ¬Â¡Â´Ã«Â Â¥", tf_deaths: "Ã­â€¢Å“Ã­Æ’â‚¬ Ã«ÂÂ°Ã¬Å Â¤",
    mvp: "MVP", score: "Ã¬Â ÂÃ¬Ë†Ëœ", deaths: "Ã«ÂÂ°Ã¬Å Â¤", ka: "Ã­â€šÂ¬ + Ã¬â€“Â´Ã¬â€¹Å“Ã¬Å Â¤Ã­Å Â¸",
    early: "Ã¬Â´Ë†Ã«Â°Ëœ", mid: "Ã¬Â¤â€˜Ã«Â°Ëœ", late: "Ã­â€ºâ€žÃ«Â°Ëœ", live_pro: "Ã«ÂÂ¼Ã¬ÂÂ´Ã«Â¸Å’ Ã­â€â€žÃ«Â¡Å“", spectate: "ÃªÂ´â‚¬Ã¬Â â€ž",
    replay: "Ã«Â¦Â¬Ã­â€Å’Ã«Â Ë†Ã¬ÂÂ´", victory: "Ã¬Å Â¹Ã«Â¦Â¬", defeat: "Ã­Å’Â¨Ã«Â°Â°", theme_dark: "Ã«â€¹Â¤Ã­ÂÂ¬", theme_light: "Ã«ÂÂ¼Ã¬ÂÂ´Ã­Å Â¸",
    visual_glass: "ÃªÂ¸â‚¬Ã«Å¾ËœÃ¬Å Â¤", visual_opaque: "Ã«Â¶Ë†Ã­Ë†Â¬Ã«Âªâ€¦",
    appearance: "Ã¬â„¢Â¸ÃªÂ´â‚¬", chooseStyleDesc: "ÃªÂ¸â‚¬Ã«Å¾ËœÃ¬Å Â¤ Ã«ËœÂÃ«Å â€ Ã¬â€ â€Ã«Â¦Â¬Ã«â€œÅ“ Ã¬Å Â¤Ã­Æ’â‚¬Ã¬ÂÂ¼ Ã¬â€žÂ Ã­Æ’Â",
    themeToggleDesc: "Ã«ÂÂ¼Ã¬ÂÂ´Ã­Å Â¸/Ã«â€¹Â¤Ã­ÂÂ¬ Ã«ÂªÂ¨Ã«â€œÅ“ Ã¬Â â€žÃ­â„¢Ëœ",
    langSelectDesc: "Ã¬â€“Â¸Ã¬â€“Â´Ã«Â¥Â¼ Ã¬â€žÂ Ã­Æ’ÂÃ­â€¢ËœÃ¬â€žÂ¸Ã¬Å¡â€",
    connectLcu: "Ã«Â¦Â¬ÃªÂ·Â¸ Ã­ÂÂ´Ã«ÂÂ¼Ã¬ÂÂ´Ã¬â€“Â¸Ã­Å Â¸ Ã¬â€”Â°ÃªÂ²Â° Ã¬Â¤â€˜...", vs1w: "1Ã¬Â£Â¼ Ã¬Â â€ž",
    cat_core: "ORACLE CORE", cat_app: "ORACLE APP", cat_insights: "ORACLE INSIGHTS",
    dashboard: "ÃªÂ°Å“Ã¬Å¡â€", tierlist: "Ã­â€¹Â°Ã¬â€“Â´Ã«Â¦Â¬Ã¬Å Â¤Ã­Å Â¸", leaderboards: "Ã«Å¾Â­Ã­â€šÂ¹",
    replays: "Ã«Â¦Â¬Ã­â€Å’Ã«Â Ë†Ã¬ÂÂ´", overlays: "Ã¬ËœÂ¤Ã«Â²â€žÃ«Â Ë†Ã¬ÂÂ´", collections: "Ã¬Â»Â¬Ã«Â â€°Ã¬â€¦Ëœ",
    esports: "eÃ¬Å Â¤Ã­ÂÂ¬Ã¬Â¸Â ", datastudio: "Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ° Ã¬Å Â¤Ã­Å Å“Ã«â€â€Ã¬ËœÂ¤", matchups: "Ã«Â§Â¤Ã¬Â¹ËœÃ¬â€”â€¦",
    watch: "ÃªÂ´â‚¬Ã¬Â â€ž"
  },
  zh: {
    overview: "Ã¦Â¦â€šÃ¨Â§Ë†", champions: "Ã¨â€¹Â±Ã©â€ºâ€ž", prohub: "Ã¨ÂÅ’Ã¤Â¸Å¡Ã¤Â¸Â­Ã¥Â¿Æ’", draft: "BPÃ§Å½Â¯Ã¨Å â€š", live: "Ã¥Â®Å¾Ã¦â€”Â¶Ã¥Â¯Â¹Ã¥Â±â‚¬",
    profile: "Ã¤Â¸ÂªÃ¤ÂºÂºÃ¨Âµâ€žÃ¦â€“â„¢", settings: "Ã¨Â®Â¾Ã§Â½Â®", connected: "Ã¥Â·Â²Ã¨Â¿Å¾Ã¦Å½Â¥", disconnected: "Ã¦Å“ÂªÃ¨Â¿Å¾Ã¦Å½Â¥",
    searchPlaceholder: "Ã¦ÂÅ“Ã§Â´Â¢Ã¥ÂÂ¬Ã¥â€Â¤Ã¥Â¸Ë†...", visualStyle: "Ã¨Â§â€ Ã¨Â§â€°Ã©Â£Å½Ã¦Â Â¼", colorTheme: "Ã©Â¢Å“Ã¨â€°Â²Ã¤Â¸Â»Ã©Â¢Ëœ",
    language: "Ã¨Â¯Â­Ã¨Â¨â‚¬", startup: "Ã¥Â¼â‚¬Ã¦Å“ÂºÃ¨â€¡ÂªÃ¥ÂÂ¯", glass: "Ã§Å½Â»Ã§â€™Æ’", opaque: "Ã¤Â¸ÂÃ©â‚¬ÂÃ¦ËœÅ½",
    themeToggle: "Ã¥Ë†â€¡Ã¦ÂÂ¢ Ã¤ÂºÂ®Ã¨â€°Â²/Ã¦Å¡â€”Ã¨â€°Â²", chooseStyle: "Ã©â‚¬â€°Ã¦â€¹Â©Ã§Å½Â»Ã§â€™Æ’Ã¦Ë†â€“Ã¤Â¸ÂÃ©â‚¬ÂÃ¦ËœÅ½Ã©Â£Å½Ã¦Â Â¼",
    chooseLang: "Ã©â‚¬â€°Ã¦â€¹Â©Ã¤Â½Â Ã§Å¡â€žÃ¨Â¯Â­Ã¨Â¨â‚¬", startupDesc: "WindowsÃ¥ÂÂ¯Ã¥Å Â¨Ã¦â€”Â¶Ã¨â€¡ÂªÃ¥Å Â¨Ã¨Â¿ÂÃ¨Â¡Å’",
    metaTierList: "Ã§â€°Ë†Ã¦Å“Â¬Ã¦Â¢Â¯Ã©ËœÅ¸", proReplays: "Ã¨ÂÅ’Ã¤Â¸Å¡Ã¥â€ºÅ¾Ã¦â€Â¾", waitingMatch: "Ã§Â­â€°Ã¥Â¾â€¦Ã¥Â¯Â¹Ã¥Â±â‚¬",
    clientDisconnected: "Ã¥Â®Â¢Ã¦Ë†Â·Ã§Â«Â¯Ã¦Å“ÂªÃ¨Â¿Å¾Ã¦Å½Â¥", liveMatch: "Ã¥Â®Å¾Ã¦â€”Â¶Ã¥Â¯Â¹Ã¥Â±â‚¬",
    rank: "Ã¦Å½â€™Ã¥ÂÂ", champion: "Ã¨â€¹Â±Ã©â€ºâ€ž", role: "Ã¤Â½ÂÃ§Â½Â®", winrate: "Ã¨Æ’Å“Ã§Å½â€¡", ban: "Ã§Â¦ÂÃ§â€Â¨Ã§Å½â€¡", tier: "Ã¦Â¢Â¯Ã©ËœÅ¸",
    kda: "KDA", dpmScore: "OracleÃ¨Â¯â€žÃ¥Ë†â€ ", kp: "Ã¥Ââ€šÃ¥â€ºÂ¢Ã§Å½â€¡", csm: "Ã¥Ë†â€ Ã¥Ââ€¡Ã¨Â¡Â¥Ã¥Ë†â‚¬", vision: "Ã¨Â§â€ Ã©â€¡Å½Ã¥Â¾â€”Ã¥Ë†â€ ", gpm: "Ã¥Ë†â€ Ã¥Ââ€¡Ã§Â»ÂÃ¦ÂµÅ½",
    goldDiff15: "15Ã¥Ë†â€ Ã©â€™Å¸Ã§Â»ÂÃ¦ÂµÅ½Ã¥Â·Â®", kaDiff15: "15Ã¥Ë†â€ Ã©â€™Å¸Ã¥Ââ€šÃ¤Â¸Å½Ã¥Â·Â®", soloKills: "Ã¥Ââ€¢Ã¦Ââ‚¬",
    match_history: "Ã¥Â¯Â¹Ã¥Â±â‚¬Ã¥Å½â€ Ã¥ÂÂ²", records: "Ã¨Â®Â°Ã¥Â½â€¢", coming_soon: "Ã¥ÂÂ³Ã¥Â°â€ Ã¦Å½Â¨Ã¥â€¡Âº...",
    behavioral: "Ã¨Â¡Å’Ã¤Â¸Âº", lens: "OracleÃ©â‚¬ÂÃ©â€¢Å“", performance: "Ã¨â€¹Â±Ã©â€ºâ€žÃ¨Â¡Â¨Ã§Å½Â°", pings: "Ã¦â‚¬Â»Ã¤Â¿Â¡Ã¥ÂÂ·",
    all: "Ã¥â€¦Â¨Ã©Æ’Â¨",
    explore_oracle: "Ã¦Å½Â¢Ã§Â´Â¢OracleÃ¥Âºâ€Ã§â€Â¨", season: "Ã¨Âµâ€ºÃ¥Â­Â£ 15", owned_skins: "Ã¥Â·Â²Ã¦â€¹Â¥Ã¦Å“â€°Ã§Å¡â€žÃ§Å¡Â®Ã¨â€šÂ¤",
    survivability: "Ã§â€Å¸Ã¥Â­ËœÃ¨Æ’Â½Ã¥Å â€º", tf_deaths: "Ã¥â€ºÂ¢Ã¦Ë†ËœÃ¦Â­Â»Ã¤ÂºÂ¡",
    mvp: "MVP", score: "Ã¨Â¯â€žÃ¥Ë†â€ ", deaths: "Ã¦Â­Â»Ã¤ÂºÂ¡", ka: "Ã¥â€¡Â»Ã¦Ââ‚¬ + Ã¥Å Â©Ã¦â€Â»",
    early: "Ã¥â€°ÂÃ¦Å“Å¸", mid: "Ã¤Â¸Â­Ã¦Å“Å¸", late: "Ã¥ÂÅ½Ã¦Å“Å¸", live_pro: "Ã¨ÂÅ’Ã¤Â¸Å¡Ã§â€ºÂ´Ã¦â€™Â­", spectate: "Ã¨Â§â€šÃ¦Ë†Ëœ",
    replay: "Ã¥â€ºÅ¾Ã¦â€Â¾", victory: "Ã¨Æ’Å“Ã¥Ë†Â©", defeat: "Ã¥Â¤Â±Ã¨Â´Â¥", theme_dark: "Ã¦Â·Â±Ã¨â€°Â²", theme_light: "Ã¦Âµâ€¦Ã¨â€°Â²",
    visual_glass: "Ã§Å½Â»Ã§â€™Æ’", visual_opaque: "Ã¤Â¸ÂÃ©â‚¬ÂÃ¦ËœÅ½",
    appearance: "Ã¥Â¤â€“Ã¨Â§â€š", chooseStyleDesc: "Ã©â‚¬â€°Ã¦â€¹Â©Ã§Å½Â»Ã§â€™Æ’Ã¦Ë†â€“Ã¤Â¸ÂÃ©â‚¬ÂÃ¦ËœÅ½Ã©Â£Å½Ã¦Â Â¼",
    themeToggleDesc: "Ã¥Ë†â€¡Ã¦ÂÂ¢Ã¤ÂºÂ®Ã¨â€°Â²/Ã¦Å¡â€”Ã¨â€°Â²Ã¦Â¨Â¡Ã¥Â¼Â",
    langSelectDesc: "Ã©â‚¬â€°Ã¦â€¹Â©Ã¤Â½Â Ã§Å¡â€žÃ©Â¦â€“Ã©â‚¬â€°Ã¨Â¯Â­Ã¨Â¨â‚¬",
    connectLcu: "Ã¨Â¿Å¾Ã¦Å½Â¥Ã¨â€¹Â±Ã©â€ºâ€žÃ¨Ââ€Ã§â€ºÅ¸Ã¥Â®Â¢Ã¦Ë†Â·Ã§Â«Â¯...", vs1w: "1Ã¥â€˜Â¨Ã¥â€°Â",
    cat_core: "ORACLE CORE", cat_app: "ORACLE APP", cat_insights: "ORACLE INSIGHTS",
    dashboard: "Ã¦Â¦â€šÃ¨Â§Ë†", tierlist: "Ã¦Â¢Â¯Ã©ËœÅ¸ & Ã¥â€¡ÂºÃ¨Â£â€¦", leaderboards: "Ã¦Å½â€™Ã¨Â¡Å’Ã¦Â¦Å“",
    replays: "Ã¥â€ºÅ¾Ã¦â€Â¾", overlays: "Ã¨Â¦â€ Ã§â€ºâ€“Ã¥Â±â€š", collections: "Ã¦â€Â¶Ã¨â€”Â",
    esports: "Ã§â€ÂµÃ§Â«Å¾", datastudio: "Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Â·Â¥Ã¤Â½Å“Ã¥Â®Â¤", matchups: "Ã¥Â¯Â¹Ã¤Â½Â",
    watch: "Ã¨Â§â€šÃ§Å“â€¹"
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

function App() {
  const [appMode, setAppMode] = useState('main');
  const [windowParams, setWindowParams] = useState({});

  // Global Settings State (Managed here for consistency)
  const [theme, setTheme] = useState(localStorage.getItem('oracle_theme') || 'dark');
  const [visualMode, setVisualMode] = useState(localStorage.getItem('oracle_visual_mode') || 'glass');
  const [language, setLanguage] = useState(localStorage.getItem('oracle_language') || 'en');

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
      testMode: false,
      positions: {
        winrate: { x: 40, y: 5 },
        jungle: { x: 2, y: 40 },
        skills: { x: 40, y: 85 },
        gold: { x: 75, y: 10 },
        notifications: { x: 80, y: 70 }
      },
      goldSound: true
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

  useEffect(() => {
    localStorage.setItem('oracle_overlay_settings', JSON.stringify(overlaySettings));
    ipcRenderer.invoke('app:register-shortcut');
    ipcRenderer.send('settings:updated', overlaySettings);
  }, [overlaySettings]);


  useEffect(() => {
    const params = getQueryParams();
    if (params.view === 'profile') {
      setAppMode('window');
      setWindowParams(params);
    } else if (params.mode === 'live') {
      setAppMode('live');
    } else if (params.mode === 'loading') {
      setAppMode('loading');
    }
  }, []);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('oracle_theme', theme);
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
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


  if (appMode === 'window' && windowParams.view === 'profile') {
    return (
      <ProfileWindow
        summonerName={windowParams.summoner}
        theme={theme}
        visualMode={visualMode}
        t={t}
      />
    );
  }

  if (appMode === 'live') {
    return (
      <LiveOverlay
        visualMode={visualMode}
        theme={theme}
        t={t}
        overlaySettings={overlaySettings}
      />
    );
  }

  if (appMode === 'loading') {
    return (
      <LoadingOverlay
        visualMode={visualMode}
        theme={theme}
        t={t}
        overlaySettings={overlaySettings}
      />
    );
  }

  return (
    <MainApp
      theme={theme} setTheme={setTheme}
      visualMode={visualMode} setVisualMode={setVisualMode}
      language={language} setLanguage={setLanguage}
      t={t}
      appMode={appMode}
      overlaySettings={overlaySettings}
      setOverlaySettings={setOverlaySettings}
    />
  );
}

// --- Main Application View ---
function MainApp({ theme, setTheme, visualMode, setVisualMode, language, setLanguage, t, appMode, overlaySettings, setOverlaySettings }) {
  const [targetSummoner, setTargetSummoner] = useState(null); // Mock search state
  const [activeTab, setActiveTab] = useState('dashboard');

  const [isConnected, setIsConnected] = useState(false);
  const { ddragonVersion, patchNotes, championList } = useCommonData();
  const [currentUser, setCurrentUser] = useState(null);
  const [browserUrl, setBrowserUrl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchRegion, setSearchRegion] = useState('EUW');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [targetChamp, setTargetChamp] = useState('Olaf');
  const [gamePhase, setGamePhase] = useState('None');
  const [userRank, setUserRank] = useState(null); // Added state for rank
  const [friends, setFriends] = useState([]); // Store friends list
  const [autoAccept, setAutoAccept] = useState(() => {
    return localStorage.getItem('oracle_auto_accept') === 'true';
  });
  const [autoImportRunes, setAutoImportRunes] = useState(() => {
    return localStorage.getItem('oracle_auto_import_runes') === 'true';
  });
  const [flashPosition, setFlashPosition] = useState(() => {
    return localStorage.getItem('oracle_flash_position') || 'F';
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
  const [splashMessage, setSplashMessage] = useState("Bienvenue sur Oracle");

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('oracle_has_visited');
    if (hasVisited) {
      setSplashMessage("Bon retour sur Oracle");
    } else {
      setSplashMessage("Bienvenue sur Oracle");
      sessionStorage.setItem('oracle_has_visited', 'true');
    }

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 100);

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

  const syncRef = useRef(null);
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
              const stats = await ipcRenderer.invoke('lcu:get-ranked-stats', user.puuid);
              setUserRank(prev => JSON.stringify(prev) !== JSON.stringify(stats) ? stats : prev);
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
          if (Array.isArray(friendsList)) setFriends(friendsList);

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
    const interval = setInterval(syncState, 3000); // 3 seconds is safer
    return () => clearInterval(interval);
  }, []); // sync effect

  useEffect(() => {
    // Show Loading/Live window automatically if enabled
    if (gamePhase === 'GameStart' || gamePhase === 'InProgress') {
      if (overlaySettings.loadingScreen) {
        ipcRenderer.invoke('app:show-live');
      }
    } else if (gamePhase === 'None') {
      ipcRenderer.invoke('app:hide-live');
    }
  }, [gamePhase, overlaySettings.loadingScreen]); // Moved out of nested effect

  // ... (keeping other handlers)

  return (
    <div className={cn("flex h-screen w-full overflow-hidden relative font-sans selection:bg-accent-primary/30 text-gray-900 dark:text-white rounded-2xl shadow-2xl border border-white/10 transition-all duration-300", isMinimizing ? "scale-95 opacity-0" : "scale-100 opacity-100")}>
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[#f5f5f7] dark:bg-[#02040a]">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-slate-900 dark:via-blue-900/40 dark:to-slate-900 opacity-100"></div>
        {visualMode === 'glass' && (
          <>
            <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-500/30 dark:bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-500/30 dark:bg-indigo-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
          </>
        )}
      </div>

      {/* SPLASH SCREEN OVERLAY */}
      <div className={cn(
        "absolute inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-700 pointer-events-none",
        showSplash ? "opacity-100" : "opacity-0"
      )}>
        {/* Splash Background - Matches App Theme */}
        <div className="absolute inset-0 bg-[#000000]">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 opacity-100"></div>
          {/* Decorative Blobs for consistency if in glass mode, or just always for splash elegance */}
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
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
              <span className="text-[10px] text-gray-500 font-mono tracking-widest">APP V.0.1.0</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-6 overflow-y-auto noscroll pr-2">

            {/* CORE */}
            <div className="space-y-1">
              <div className="px-4 text-[10px] font-medium text-white/20 uppercase tracking-[0.2em] mb-3">{t('cat_core')}</div>
              <NavItem active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<LayoutDashboard size={18} />} label={t('dashboard')} />
              <NavItem active={activeTab === 'tierlist'} onClick={() => setActiveTab('tierlist')} icon={<Trophy size={18} />} label={t('tierlist')} />
              <NavItem active={activeTab === 'leaderboards'} onClick={() => setActiveTab('leaderboards')} icon={<Trophy size={18} />} label={t('leaderboards')} />
            </div>

            {/* APP */}
            <div className="space-y-1">
              <div className="px-4 text-[10px] font-medium text-white/20 uppercase tracking-[0.2em] mb-3">{t('cat_app')}</div>
              <NavItem active={activeTab === 'replays'} onClick={() => setActiveTab('replays')} icon={<MonitorPlay size={18} />} label="Analyse" />
              <NavItem active={activeTab === 'collections'} onClick={() => setActiveTab('collections')} icon={<Brain size={18} />} label={t('collections')} />
            </div>

            {/* INSIGHTS */}
            <div className="space-y-1">
              <div className="px-4 text-[10px] font-medium text-white/20 uppercase tracking-[0.2em] mb-3">{t('cat_insights')}</div>
              <NavItem active={activeTab === 'esports'} onClick={() => setActiveTab('esports')} icon={<Globe size={18} />} label={t('esports')} />
              <NavItem active={activeTab === 'datastudio'} onClick={() => setActiveTab('datastudio')} icon={<Activity size={18} />} label={t('datastudio')} />
              <NavItem active={activeTab === 'matchups'} onClick={() => setActiveTab('matchups')} icon={<Gamepad2 size={18} />} label={t('matchups')} />
            </div>

          </nav>

          {/* Bottom Profile Widget */}
          <div className="mt-auto pt-4">
            <SidebarProfile
              currentUser={currentUser}
              rankedStats={userRank}
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
          <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200/20 dark:border-white/10 shrink-0 z-20 relative app-drag-region">
            <div className="flex items-center gap-2 no-drag">
              <div className="flex items-center gap-1.5 mr-4">
                <button
                  onClick={goBack}
                  disabled={navIndex <= 0}
                  className="flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-10 transition-all active:scale-90 p-1"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={goForward}
                  disabled={navIndex >= navHistory.length - 1}
                  className="flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-10 transition-all active:scale-90 p-1"
                >
                  <ChevronRight size={20} />
                </button>
                <div className="w-px h-4 bg-white/10 mx-1"></div>
                <button
                  onClick={() => window.location.reload()}
                  className="flex items-center justify-center text-gray-400 hover:text-white transition-all active:rotate-180 duration-500 p-1"
                >
                  <RefreshCw size={18} />
                </button>
              </div>

              <div className="relative">
                <div className="flex items-center gap-4 text-white/50 bg-white/5 px-4 py-2 rounded-xl border border-white/10 focus-within:border-blue-500/50 transition-all no-drag backdrop-blur-md">
                  <Search size={16} />
                  <select
                    value={searchRegion}
                    onChange={(e) => setSearchRegion(e.target.value)}
                    className="bg-transparent text-xs font-bold text-gray-500 uppercase outline-none border-none cursor-pointer hover:text-white transition-colors"
                  >
                    {regions.map(r => <option key={r} value={r} className="bg-[#1C1C21] text-gray-300">{r}</option>)}
                  </select>
                  <div className="w-px h-4 bg-white/10 mx-2"></div>
                  <input
                    type="text"
                    placeholder={t('search_hint')}
                    className="bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-500 w-64 text-sm"
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
                  <div className="absolute top-full left-0 w-full mt-2 bg-[#1C1C21] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 no-drag max-h-64 overflow-y-auto custom-scrollbar">

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
                          <img src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${cId}.png`} className="w-8 h-8 rounded-lg border border-white/10 group-hover:border-accent-primary" />
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-white">{cName}</span>
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
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-blue-400">
                          <History size={16} className="text-gray-500 group-hover:text-blue-400" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-white uppercase">{s.name}</span>
                          <span className="text-[9px] text-gray-500 uppercase tracking-widest flex items-center gap-1 group-hover:text-blue-400">
                            Profil RÃƒÂ©cents <span className="opacity-50">Ã¢â‚¬Â¢</span> {s.region}
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
                          <img src={`https://ddragon.leagueoflegends.com/cdn/16.1.1/img/profileicon/${f.icon || 29}.png`} className="w-8 h-8 rounded-full border border-white/10 group-hover:border-green-400" />
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-white flex items-center gap-1">
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
                onClick={() => setActiveTab('settings')}
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
                  activeTab === 'settings'
                    ? "bg-accent-primary text-black shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                    : "text-gray-400 hover:bg-white/10 hover:text-white"
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
            {(!isConnected && activeTab !== 'settings') ? (
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
                  onSearch={(name) => {
                    setTargetSummoner(name);
                    setActiveTab('profile');
                  }}
                />}
                {activeTab === 'profile' && <ProfileView
                  targetSummoner={targetSummoner}
                  currentUser={currentUser}
                  panelClass={panelClass}
                  t={t}
                  onSearch={setTargetSummoner}
                  onChampClick={(c) => { setTargetChamp(c); setActiveTab('tierlist'); }}
                  onBack={() => setActiveTab('dashboard')}
                />}
                {activeTab === 'tierlist' && <BuildView panelClass={panelClass} t={t} initialChamp={targetChamp} ddragonVersion={ddragonVersion} />}
                {activeTab === 'replays' && <ReplaysView currentUser={currentUser} panelClass={panelClass} t={t} />}

                {/* V2 New Views */}
                {activeTab === 'matchups' && <MatchupsView panelClass={panelClass} t={t} championList={championList} ddragonVersion={ddragonVersion} />}
                {activeTab === 'esports' && <EsportsView panelClass={panelClass} t={t} />}
                {activeTab === 'collections' && <CollectionsView panelClass={panelClass} t={t} ddragonVersion={ddragonVersion} currentUser={currentUser} championList={championList} />}
                {activeTab === 'leaderboards' && <RankingsView
                  panelClass={panelClass}
                  t={t}
                  setTargetSummoner={setTargetSummoner}
                  setActiveTab={setActiveTab}
                  ddragonVersion={ddragonVersion}
                />}
                {activeTab === 'watch' && <EsportsView panelClass={panelClass} t={t} />}

                {/* Dev / Game State Views */}
                {activeTab === 'draft' && <DraftSimView panelClass={panelClass} t={t} />}
                {activeTab === 'live' && <LiveGameLoadingView panelClass={panelClass} t={t} />}

                {/* Fallback */}
                {['datastudio'].includes(activeTab) && (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <Brain size={48} className="mb-4 opacity-20" />
                    <h2 className="text-xl font-bold">{t(activeTab)}</h2>
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
                  overlaySettings={overlaySettings}
                  setOverlaySettings={setOverlaySettings}
                  panelClass={panelClass}
                />
                }
              </div>
            )}
          </div>

          {browserUrl && (
            <BrowserOverlay url={browserUrl} onClose={() => setBrowserUrl(null)} />
          )}
        </div>
      </main >
    </div >
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
    <div className="h-screen w-full bg-[#f5f5f7] dark:bg-[#000000] text-gray-900 dark:text-white font-sans overflow-hidden relative app-drag-region">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 opacity-100"></div>
      {visualMode === 'glass' && (
        <>
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-400/30 dark:bg-indigo-600/20 rounded-full blur-3xl"></div>
        </>
      )}

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
                <h3 className="font-bold text-gray-900 dark:text-white">{t('rank')} {t('rank')}</h3>
                <div className="text-sm">{t('coming_soon')}</div>
              </div>
              <div className={cn("p-6 h-40 flex items-center justify-center text-gray-500 flex-col gap-2", panelClass)}>
                <h3 className="font-bold text-gray-900 dark:text-white">{t('match_history')}</h3>
                <div className="text-sm">{t('coming_soon')}</div>
              </div>
              <div className={cn("p-6 h-40 flex items-center justify-center text-gray-500 flex-col gap-2", panelClass)}>
                <h3 className="font-bold text-gray-900 dark:text-white">Mastery</h3>
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
function SidebarProfile({ currentUser, rankedStats, isConnected, appMode, t, onClick }) {
  if (!currentUser) {
    return (
      <div className="flex items-center gap-3 px-2 py-2 rounded-xl bg-white/5 border border-white/5">
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
    <div onClick={onClick} className="relative group cursor-pointer hover:bg-white/5 rounded-2xl p-3 transition-colors flex items-center gap-4 select-none">
      {/* Avatar Container with Badges */}
      <div className="relative shrink-0 mt-1 mb-1">
        {/* Server Badge (Top Right) */}
        <div className="absolute -top-1.5 -right-1.5 bg-[#5c7ce5] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md z-20 shadow-sm border border-[#5c7ce5] shadow-blue-500/20 uppercase">
          {currentUser.region || "EUW"}
        </div>

        {/* Main Icon */}
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/16.1.1/img/profileicon/${currentUser.profileIconId}.png`}
          className="w-14 h-14 rounded-2xl border-2 border-[#1e1e24] shadow-lg"
          alt="Profile"
        />

        {/* Level Badge (Bottom Center) */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#1e1e1e] text-white text-[9px] font-bold px-2 py-0.5 rounded-md border border-[#2d2d35] z-20 whitespace-nowrap min-w-[24px] text-center">
          {currentUser.summonerLevel}
        </div>
      </div>

      {/* Info Container */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        {/* Name & Tag */}
        <div className="flex items-baseline gap-1 mb-1 w-full">
          <span className="text-white font-bold text-lg truncate leading-none" title={currentUser.gameName || currentUser.displayName}>
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

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 px-4 py-2.5 rounded-2xl transition-all duration-500 group relative overflow-hidden",
        active
          ? "text-white"
          : "text-white/40 hover:bg-white/5 hover:text-white"
      )}
    >
      {active && (
        <>
          <div className="absolute inset-0 bg-blue-500/20 border border-blue-400/30 rounded-2xl -z-10 backdrop-blur-md"></div>
          <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-blue-500 rounded-full blur-[2px]"></div>
        </>
      )}
      <span className={cn("relative z-10 transition-all duration-500", active ? "scale-110 text-blue-400" : "group-hover:scale-110 group-hover:text-white/80")}>
        {icon}
      </span>
      <span className={cn(
        "hidden lg:block relative z-10 tracking-tight whitespace-nowrap transition-all duration-500",
        active ? "translate-x-1 font-black text-white" : "group-hover:translate-x-0.5 font-medium text-white/50"
      )}>{label}</span>
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
      <button onClick={requestMinimize} className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors no-drag">
        <div className="w-3 h-0.5 bg-current rounded-full"></div>
      </button>
      <button onClick={handleClose} className="w-8 h-8 rounded-lg hover:bg-red-500/20 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors no-drag">
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

function DashboardView({ t, panelClass, currentUser, targetSummoner, ddragonVersion, patchNotes, setActiveTab, setTargetChamp, onOpenUrl, onSearch }) {
  const version = ddragonVersion || "16.1.1";
  /* DashboardView: Always show currentUser, ignoring search results */
  const displayUser = currentUser;
  const [rankedStats, setRankedStats] = useState(null);
  const [matchHistory, setMatchHistory] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [allRolesMeta, setAllRolesMeta] = useState({});
  const [currentRoleIdx, setCurrentRoleIdx] = useState(0);
  const [metaProgress, setMetaProgress] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [loading, setLoading] = useState(true);

  const lastFetchedPuuid = useRef(null);

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
          console.log(`[Dashboard] ${currentData ? 'Refreshing' : 'Priority loading'} meta for ${activeRole}...`);
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

      // 2. Fetch the rest in parallel (but throttled or simple parallel)
      const otherRoles = ROLES.filter(r => r !== activeRole);
      Promise.all(otherRoles.map(async (role) => {
        if (!active) return;
        const rData = allRolesMeta[role];
        const rStale = !rData || (Date.now() - (rData.timestamp || 0) > REFRESH_INTERVAL);

        if (rStale) {
          try {
            console.log(`[Dashboard] Background loading meta for ${role}...`);
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
  }, [currentRoleIdx]); // Re-run if role manually changes and data missing

  useEffect(() => {
    async function fetchPersonalData() {
      if (!displayUser?.puuid) return;
      lastFetchedPuuid.current = displayUser.puuid;

      // Only show loading on initial switch, stay silent on background refreshes
      if (!rankedStats) setLoading(true);

      try {
        const stats = await window.ipcRenderer.invoke('lcu:get-ranked-stats', displayUser.puuid);
        const history = await window.ipcRenderer.invoke('lcu:get-match-history', displayUser.puuid);
        if (stats) setRankedStats(stats);
        if (history && history.games) setMatchHistory(history.games.games.slice(0, 20));
      } catch (e) {
        console.error("Dashboard Personal Data Error", e);
      } finally {
        setLoading(false);
      }
    }

    fetchPersonalData();
    const refreshTimer = setInterval(fetchPersonalData, 60000); // Auto-Refresh every 60s
    return () => clearInterval(refreshTimer);
  }, [displayUser?.puuid]);

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
  // Real data calculations with history for sparklines
  const stats = useMemo(() => {
    const base = { kda: "0.0", wr: "0%", csm: "0.0", games: 0, kp: "0%", vision: "0.0", gpm: "0", oracle: "0.0", goldDiff: "0", kaDiff: "0", history: {} };
    const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    const recentGames = matchHistory.filter(g => (g.gameCreation || Date.now()) >= sevenDaysAgo);

    if (!recentGames.length || !displayUser) return base;

    let k = 0, d = 0, a = 0, cs = 0, wins = 0, vision = 0, gpm = 0;
    let teamKillsTotal = 0, myParticipations = 0;
    let totalGoldDiff = 0, totalKaDiff = 0;
    let count = 0, validDiffCount = 0;

    const hist = { kda: [], oracle: [], kp: [], csm: [], vision: [], gpm: [], gold: [], ka: [] };

    // Process from oldest to newest for the sparkline (reverse recentGames)
    [...recentGames].reverse().forEach(g => {
      const identity = g.participantIdentities?.find(ident =>
        ident.player.puuid === displayUser.puuid ||
        ident.player.summonerName === displayUser.gameName ||
        ident.player.displayName === displayUser.displayName ||
        ident.player.summonerName === displayUser.displayName
      );
      if (!identity) return;
      const p = g.participants.find(part => part.participantId === identity.participantId);
      if (!p) return;
      const s = p.stats || p; // Handle different LCU vs Scraper structures

      count++;
      const durationMin = (g.gameDuration || 1200) / 60;

      k += (s.kills || 0); d += (s.deaths || 0); a += (s.assists || 0);
      cs += ((s.totalMinionsKilled || 0) + (s.neutralMinionsKilled || 0));
      vision += (s.visionScore || 0);
      gpm += ((s.goldEarned || 0) / durationMin);
      if (s.win) wins++;

      // History mapping
      const gameKda = parseFloat((((s.kills || 0) + (s.assists || 0)) / Math.max(1, (s.deaths || 0))).toFixed(1));
      hist.kda.push(gameKda);
      hist.csm.push(parseFloat((((s.totalMinionsKilled || 0) + (s.neutralMinionsKilled || 0)) / durationMin).toFixed(1)));
      hist.vision.push(s.visionScore || 0);
      hist.gpm.push(Math.round((s.goldEarned || 0) / durationMin));

      const myTeamId = p.teamId;
      const teamParticipants = g.participants.filter(tp => tp.teamId === myTeamId);
      const teamKills = teamParticipants.reduce((acc, tp) => {
        const ts = tp.stats || tp;
        return acc + (ts.kills || 0);
      }, 0);
      teamKillsTotal += teamKills;
      myParticipations += ((s.kills || 0) + (s.assists || 0));
      hist.kp.push(teamKills > 0 ? Math.min(100, Math.round((((s.kills || 0) + (s.assists || 0)) / teamKills) * 100)) : 0);

      // Improved Opponent Detection for Gold Diff
      const normalizeLane = l => {
        l = (l || "").toUpperCase();
        if (l === "MID") return "MIDDLE";
        if (l === "JGL") return "JUNGLE";
        if (l === "BOT") return "BOTTOM";
        if (l === "SUPP" || l === "UTILITY") return "SUPPORT";
        return l;
      };

      const myLane = normalizeLane(p.timeline?.lane || p.lane);
      const myRole = (p.timeline?.role || p.role || "NONE").toUpperCase();

      const opponent = g.participants.find(op => {
        if (op.teamId === myTeamId) return false;
        const opLane = normalizeLane(op.timeline?.lane || op.lane);
        const opRole = (op.timeline?.role || op.role || "NONE").toUpperCase();

        // Match by Lane primarily
        if (myLane !== "NONE" && myLane !== "" && myLane !== "UNKNOWN") {
          if (opLane === myLane) return true;
        }
        // Fallback to Role
        return opRole !== "NONE" && opRole === myRole;
      });

      if (opponent) {
        validDiffCount++;
        const os = opponent.stats || opponent;
        // Estimate Gold @ 15 as ~45% of total gold if we don't have timeline frames
        const myGold = s.goldEarned || 0;
        const opGold = os.goldEarned || 0;
        const gDiff = Math.round((myGold - opGold) * 0.45);
        totalGoldDiff += gDiff;
        hist.gold.push(gDiff);

        const myKa = (s.kills || 0) + (s.assists || 0);
        const opKa = (os.kills || 0) + (os.assists || 0);
        const kaDiff = myKa - opKa;
        totalKaDiff += kaDiff;
        hist.ka.push(kaDiff);
      } else if (g.participants.length === 2 || g.isExternal) {
        // SPECIAL CASE: External matches or 1v1 mocks
        const fallbackOp = g.participants.find(part => part.participantId !== p.participantId && part.teamId !== myTeamId);
        if (fallbackOp) {
          validDiffCount++;
          const os = fallbackOp.stats || fallbackOp;
          const gDiff = Math.round(((s.goldEarned || 0) - (os.goldEarned || 0)) * 0.45);
          totalGoldDiff += gDiff;
          hist.gold.push(gDiff);
          const kaDiff = ((s.kills || 0) + (s.assists || 0)) - ((os.kills || 0) + (os.assists || 0));
          totalKaDiff += kaDiff;
          hist.ka.push(kaDiff);
        } else {
          hist.gold.push(0); hist.ka.push(0);
        }
      } else {
        // Fallback: search by rank (1-5 vs 6-10) if standard game
        const myIndex = g.participants.findIndex(part => part.participantId === p.participantId);
        if (myIndex !== -1) {
          const opIndex = myIndex < 5 ? myIndex + 5 : myIndex - 5;
          const fallbackOp = g.participants[opIndex];
          if (fallbackOp) {
            validDiffCount++;
            const os = fallbackOp.stats || fallbackOp;
            const gDiff = Math.round(((s.goldEarned || 0) - (os.goldEarned || 0)) * 0.45);
            totalGoldDiff += gDiff;
            hist.gold.push(gDiff);
            const kaDiff = ((s.kills || 0) + (s.assists || 0)) - ((os.kills || 0) + (os.assists || 0));
            totalKaDiff += kaDiff;
            hist.ka.push(kaDiff);
          } else {
            hist.gold.push(0); hist.ka.push(0);
          }
        } else {
          hist.gold.push(0); hist.ka.push(0);
        }
      }

      // Mock Oracle score per game
      hist.oracle.push(Math.round((s.win ? 30 : 0) + (gameKda * 5) + ((s.visionScore || 0) / 2)));
    });

    if (count === 0) return base;

    const winRate = wins / count;
    const avgKills = k / count;
    const oracleScore = ((winRate * 60) + (avgKills * 4)).toFixed(1);
    const totalDurationMinutes = matchHistory.reduce((acc, g) => acc + (g.gameDuration || 1200), 0) / 60;
    const csmCalculated = totalDurationMinutes > 0 ? (cs / totalDurationMinutes).toFixed(1) : "0.0";
    const avgGoldDiff = validDiffCount > 0 ? Math.round(totalGoldDiff / validDiffCount) : 0;
    const avgKaDiff = validDiffCount > 0 ? (totalKaDiff / validDiffCount).toFixed(1) : "0.0";

    return {
      kda: ((k + a) / Math.max(1, d)).toFixed(1),
      wr: Math.round(winRate * 100) + "%",
      csm: csmCalculated,
      kp: teamKillsTotal > 0 ? Math.min(100, Math.round((myParticipations / teamKillsTotal) * 100)) + "" : "0",
      vision: (vision / count).toFixed(1),
      gpm: (gpm / count).toFixed(0),
      oracle: oracleScore,
      wins, count,
      losses: count - wins,
      goldDiff: (avgGoldDiff > 0 ? "+" : "") + avgGoldDiff,
      kaDiff: (parseFloat(avgKaDiff) > 0 ? "+" : "") + avgKaDiff,
      history: hist
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
                <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${displayUser?.profileIconId || 29}.png`} className="w-24 h-24 rounded-3xl border-2 border-white/10 shadow-2xl" />
                <div className="absolute -bottom-3 -right-3 bg-[#1e1e24] text-white text-[10px] font-black px-2 py-1 rounded-lg border border-white/5">
                  {displayUser?.summonerLevel || 1}
                </div>
                <div className="absolute -top-3 -left-3 bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md border border-white/10 shadow-lg uppercase tracking-widest">
                  {displayUser?.region || "EUW"}
                </div>
              </div>
              <div>
                <h1 className="text-5xl font-black text-white tracking-tighter mb-1">{displayUser?.gameName || displayUser?.displayName || "Summoner"}</h1>
                <div className="text-xl font-bold text-white/30 tracking-tight">#{displayUser?.tagLine || "1234"}</div>
              </div>
            </div>

            {/* Header Right Content Removed */}
          </div>

          {/* STATS BAR (Integrated) */}
          <div className="relative z-10 grid grid-cols-4 gap-3">
            <DashboardStatCard label={t('kda')} value={stats.kda} trend="+0.1" color="#4ade80" data={stats.history.kda} />
            <DashboardStatCard label={t('dpmScore').toUpperCase()} value={stats.oracle} trend="+5.2" color="#4ade80" data={stats.history.oracle} />
            <DashboardStatCard label={t('kp')} value={stats.kp} trend="-2.0" trendDown color="#ff4e50" data={stats.history.kp} />
            <DashboardStatCard label={t('csm')} value={stats.csm} trend="-0.5" trendDown color="#ff4e50" data={stats.history.csm} />

            <DashboardStatCard label={t('vision')} value={stats.vision} trend="+0.3" color="#4ade80" data={stats.history.vision} />
            <DashboardStatCard label={t('gpm')} value={stats.gpm} trend="+12" color="#4ade80" data={stats.history.gpm} />
            <DashboardStatCard label={t('goldDiff15')} value={stats.goldDiff} trend={stats.goldDiff} trendDown={parseFloat(stats.goldDiff) < 0} color={parseFloat(stats.goldDiff) >= 0 ? "#4ade80" : "#ff4e50"} data={stats.history.gold} />
            <DashboardStatCard label={t('kaDiff15')} value={stats.kaDiff} trend={stats.kaDiff} trendDown={parseFloat(stats.kaDiff) < 0} color={parseFloat(stats.kaDiff) >= 0 ? "#4ade80" : "#ff4e50"} data={stats.history.ka} />
          </div>
        </div>

        {/* MIDDLE CONTENT ROW */}
        <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
          {/* Champion Meta Widget */}
          <div className={cn("col-span-8 p-5 rounded-[24px] group transition-all duration-500 relative overflow-hidden", panelClass)}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-black text-white uppercase tracking-tighter flex items-center gap-3">
                  <Swords size={18} className="text-blue-500 animate-pulse" />
                  {t ? t('metaTierList') : "MÃƒÂ©ta Actuelle"} Ã¢â‚¬Â¢ <span className="text-blue-400 capitalize">{ROLES[currentRoleIdx] || "Top"}</span>
                </h3>
              </div>
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
                    className="flex flex-col items-center justify-between p-4 rounded-[20px] bg-white/5 dark:bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg hover:border-blue-500/50 hover:shadow-blue-500/20 hover:-translate-y-1 transition-all cursor-pointer group/champ h-[140px]"
                  >
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${normalizeChampName(c.name)}.png`}
                      className="w-14 h-14 rounded-2xl shadow-md group-hover/champ:scale-105 transition-transform"
                      onError={(e) => { e.target.src = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/Yasuo.png`; }}
                    />
                    <div className="flex flex-col items-center gap-1 w-full overflow-hidden">
                      <div className="text-[10px] font-black text-white group-hover/champ:text-blue-400 transition-colors truncate w-full text-center">
                        {c.name || "Inconnu"}
                      </div>
                      <div className="text-[9px] font-bold text-blue-400 uppercase tracking-wide">
                        {c.tier} TIER
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-12 flex flex-col items-center justify-center h-[140px] text-white/20">
                  <Activity className="w-8 h-8 mb-2 opacity-50 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest">Chargement des informations</span>
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
              <div className="text-white font-black uppercase text-sm mb-1 tracking-tight">DerniÃƒÂ¨re Partie</div>
              <div className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-4 italic">
                {getQueueName(matchHistory[0], t)} Ã¢â‚¬Â¢ {matchHistory[0]?.gameDuration ? Math.floor(matchHistory[0].gameDuration / 60) + ":" + (matchHistory[0].gameDuration % 60).toString().padStart(2, '0') : "00:00"} Ã¢â‚¬Â¢ {matchHistory[0] ? (() => { try { return new Date(matchHistory[0].gameCreation).toLocaleDateString(); } catch { return "-"; } })() : "-"}
              </div>
              <div className="text-lg font-black text-white">
                {p.stats?.kills || 0} <span className="text-white/20">/</span> <span className="text-red-500">{p.stats?.deaths || 0}</span> <span className="text-white/20">/</span> {p.stats?.assists || 0}
              </div>
              <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mt-1">
                {(((p.stats?.kills || 0) + (p.stats?.assists || 0)) / Math.max(1, p.stats?.deaths || 1)).toFixed(2)} KDA
              </div>
            </div>
            <button
              onClick={() => setActiveTab('replays')}
              className="relative z-10 w-full mt-2 py-2 bg-white/10 rounded-xl text-[10px] font-black text-white uppercase tracking-widest border border-white/5 hover:bg-white/20 hover:scale-105 transition-all cursor-pointer"
            >
              Voir l'analyse
            </button>
          </div>
        </div>

        {/* NEW ROW: Patch News Feed */}
        <div className={cn("p-5 rounded-[24px] flex flex-col gap-4 relative overflow-hidden shrink-0 min-h-[160px]", panelClass)}>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-white uppercase tracking-tighter flex items-center gap-3">
              <Newspaper size={18} className="text-purple-500" />
              ActualitÃƒÂ©s des Patchs
            </h3>
            <button
              onClick={() => onOpenUrl("https://www.leagueoflegends.com/fr-fr/news/game-updates/")}
              className="text-[10px] font-bold text-white/40 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-1"
            >
              Voir tout <ExternalLink size={10} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {Array.isArray(patchNotes) && patchNotes.slice(0, 2).map((p, i) => {
              if (!p || !p.url) return null;
              return (
                <div key={p.url} onClick={() => onOpenUrl?.(p.url)} className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group flex items-center gap-4">
                  <div className={cn("w-16 h-12 rounded-lg bg-black/40 overflow-hidden flex items-center justify-center border border-white/10 font-black text-[10px] shrink-0", i === 0 ? "text-purple-400 border-purple-400/20 shadow-lg shadow-purple-500/10" : "text-gray-400")}>
                    {p.image ? (
                      <img src={p.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" alt="News" />
                    ) : (
                      p.patch || "NR"
                    )}
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className={cn("text-sm font-bold transition-colors truncate", i === 0 ? "text-white group-hover:text-purple-400" : "text-gray-300 group-hover:text-white")}>{p.title || "Patch Notes"}</div>
                    <div className="text-[10px] text-gray-400 line-clamp-1">{p.summary || "Aucun rÃƒÂ©sumÃƒÂ© disponible."}</div>
                    <div className="text-[9px] text-gray-500 mt-1 font-mono uppercase tracking-widest">{p.date || "RÃƒÂ©cemment"}</div>
                  </div>
                </div>
              )
            })}
            {(!patchNotes || patchNotes.length === 0) && (
              <div className="col-span-2 py-4 text-center text-white/10 text-xs font-bold uppercase tracking-widest border border-dashed border-white/5 rounded-xl">
                Chargement des actualitÃƒÂ©s...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- RIGHT COLUMN: SIDEBAR (3/12) --- */}
      <div className="col-span-12 xl:col-span-3 h-full flex flex-col gap-4">

        {/* RANK CARD (Modern Style from Profile) */}
        <ModernRankCard
          type="Solo/Duo"
          data={rankedStats?.queueMap?.RANKED_SOLO_5x5}
          panelClass={cn(panelClass, "min-h-[140px]")}
          t={t}
        />


        {/* MATCH HISTORY SIDEBAR */}
        <div className={cn("rounded-[24px] overflow-hidden flex flex-col min-h-0", panelClass)}>
          <div className="p-4 border-b border-white/5 shrink-0">
            <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">DerniÃƒÂ¨res Parties</div>
          </div>
          <div className="h-[575px] overflow-y-auto custom-scrollbar bg-black/20 p-2 space-y-2">
            {matchHistory.map((g, i) => (
              <HistoryRowV2
                key={i}
                game={g}
                puuid={displayUser?.puuid}
                onClick={() => setSelectedGame(g)}
              />
            ))}
          </div>
          <div className="p-3 flex justify-center border-t border-white/5 shrink-0 hover:bg-white/5 cursor-pointer transition-colors">
            <ChevronDown size={14} className="text-white/20 group-hover:text-white/50" />
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
          />
        </div>

      </div >

    </div >
  );
}

// COMPONENT: Dashboard Stat Card with Interactive Sparkline
function DashboardStatCard({ label, value, trend, trendDown, color, data = [] }) {
  const [hoverIndex, setHoverIndex] = useState(null);
  const maxVal = Math.max(...data, 1);
  const minVal = Math.min(...data, 0);
  const range = maxVal - minVal;

  const points = data.map((v, i) => ({
    x: (i / Math.max(1, data.length - 1)) * 100,
    y: 40 - ((v - minVal) / Math.max(1, range)) * 18 - 11, // Even more restricted to middle
    value: v
  }));

  const pathData = points.length > 2
    ? points.reduce((acc, p, i, a) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = a[i - 1];
      const next = a[i + 1] || p;
      const cp1x = prev.x + (p.x - prev.x) * 0.3;
      const cp1y = prev.y;
      const cp2x = p.x - (p.x - prev.x) * 0.3;
      const cp2y = p.y;
      return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p.x} ${p.y}`;
    }, "")
    : points.length > 0
      ? `M ${points.map(p => `${p.x} ${p.y}`).join(' L ')}`
      : "";

  return (
    <div className="bg-white/5 dark:bg-black/20 backdrop-blur-xl rounded-[24px] p-5 border border-white/10 flex flex-col justify-between h-[115px] group hover:border-blue-500/30 transition-all relative overflow-hidden shadow-2xl">
      {/* Background Glow */}
      <div
        className="absolute -right-4 -bottom-4 w-16 h-16 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{ backgroundColor: color }}
      />

      <div className="flex justify-between items-start relative z-10">
        <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.15em]">{label}</div>
        {hoverIndex !== null && (
          <div className="text-[10px] font-black px-2 py-0.5 rounded bg-white/10 text-white animate-in fade-in zoom-in duration-200">
            {points[hoverIndex].value}
          </div>
        )}
      </div>

      <div className="flex items-end justify-between relative z-10">
        <div className="min-w-0">
          <div className="text-3xl font-black text-white tracking-tighter mb-1 select-none flex items-baseline gap-1">
            <span>{value}</span>
            {label.toUpperCase().includes('KP') && !value.toString().includes('%') && <span className="text-sm font-bold opacity-30 select-none">%</span>}
          </div>
          <div className={cn("text-[10px] font-black flex items-center gap-1.5 uppercase tracking-wider transition-transform group-hover:translate-x-1", trendDown ? "text-red-400" : "text-emerald-400")}>
            <div className={cn("w-1.5 h-1.5 rounded-full", trendDown ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.5)]")} />
            {trend} <span className="text-white/20 font-bold lowercase opacity-40">vs 1w</span>
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
function HistorySidebarCard({ game }) {
  const p = game.participants[0];
  const isWin = p.stats.win;
  const kda = ((p.stats.kills + p.stats.assists) / Math.max(1, p.stats.deaths)).toFixed(1);
  const time = (() => { try { return new Date(game.gameCreation).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }); } catch { return "--:--"; } })();

  return (
    <div className="p-4 border-b border-white/5 hover:bg-white/5 transition-all group flex items-center gap-4">
      <div className="flex flex-col gap-0.5 min-w-[50px]">
        <div className="text-[10px] font-black text-white tabular-nums">{time}</div>
        <div className="text-[8px] font-black text-white/20 uppercase tracking-widest">Solo/Duo</div>
      </div>
      <div className="relative">
        <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${p.championId}.png`} className="w-8 h-8 rounded-lg shadow-lg" />
        <div className={cn("absolute -top-1 -right-1 w-2 h-2 rounded-full border border-[#1e1e24]", isWin ? "bg-blue-500" : "bg-red-500")} />
      </div>
      <div className="flex-1">
        <div className="text-xs font-black text-white tabular-nums">
          {p.stats.kills} <span className="text-white/20">/</span> <span className="text-red-500">{p.stats.deaths}</span> <span className="text-white/20">/</span> {p.stats.assists}
        </div>
        <div className="text-[9px] font-black text-white/20 uppercase tracking-widest">{kda} KDA</div>
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
      <img src={`https://ddragon.leagueoflegends.com/cdn/16.1.1/img/champion/${normalizeChampName(name)}.png`} className="w-10 h-10 rounded-2xl shadow-xl border border-white/10" />
      <div className="text-center">
        <div className="text-[10px] font-black text-white uppercase tracking-widest mb-0.5">{name}</div>
        <div className="text-[9px] font-black text-white/40 uppercase mb-1">{win} - <span className="text-red-500">{loss}</span></div>
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

function ProfileView({ t, panelClass, currentUser, targetSummoner, onSearch, onChampClick, onBack }) {
  const [displayUser, setDisplayUser] = useState(null);
  const [rankedStats, setRankedStats] = useState(null);
  const [history, setHistory] = useState([]);
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
    async function fetchData(isInitial = false) {
      try {
        if (isInitial) setLoading(true); // Only show spinner on first load/search change
        setError(null); // Clear previous errors
        let user = null;
        if (targetSummoner) {
          // If searching, result is the result. If null, IT IS NULL. Do not fallback to current user.
          console.log("Searching for:", targetSummoner);
          const { name, region, skipLcu, puuid } = (typeof targetSummoner === 'string')
            ? { name: targetSummoner, region: null, skipLcu: false, puuid: null }
            : targetSummoner;

          // Force timeout after 12s to prevent infinite loading
          const searchPromise = window.ipcRenderer.invoke('lcu:search-summoner', name, region, skipLcu, puuid);
          const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Search timed out")), 12000));

          try {
            user = await Promise.race([searchPromise, timeoutPromise]);
          } catch (err) {
            console.error("Search failed or timed out", err);
            user = null; // Treat as not found on timeout
          }

          console.log("Search Result:", user);
        } else {
          user = currentUser;
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
                  let champName = "Inconnu";
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
                    champName = "Inconnu"; // TFT specific request
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
          const [stats, matches, mastery] = await Promise.all([
            window.ipcRenderer.invoke('lcu:get-ranked-stats', user.puuid),
            // FETCH 50 GAMES FOR BETTER TOP CHAMP STATS
            window.ipcRenderer.invoke('lcu:get-match-history', user.puuid, 0, 50),
            window.ipcRenderer.invoke('lcu:get-champion-mastery', user.puuid)
          ]);

          setRankedStats(stats);

          if (!matches) {
            console.warn("Matches returned null");
          }

          if (matches) {
            const gamesList = matches.games?.games || matches.games || (Array.isArray(matches) ? matches : []);

            if (gamesList.length > 0) {
              const recentGames = gamesList; // Use all 50

              // Only use first 5 for expensive full-game teammate check
              const gamesForTeammates = recentGames.slice(0, 5);

              setHistory(recentGames.slice(0, 20)); // Show 20 in history list

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

                const sortedChamps = Object.values(champStats).sort((a, b) => b.count - a.count).slice(0, 5);
                setTopChamps(sortedChamps);
                setRoleStats(roleCounts);
              } catch (e) {
                console.error("Top Champ Calc Error", e);
              }

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

                  const calculatedTeammates = Object.values(partnerCounts).sort((a, b) => b.lastSeen - a.lastSeen).slice(0, 5);

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
        if (isInitial) setLoading(false);
      }
    }

    // Reset Critical States on prop change to avoid stale data
    setHistory([]);
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

    const playstyle = avgKDA > 4 ? "Aggressive Carry" : avgCSM > 7.5 ? "Consistent Farmer" : "Tactical Specialist";
    const focus = avgDeaths > 7 ? "Die Less" : avgVision < 12 ? "Vision Control" : avgObjDmg < 5000 ? "Objective Push" : "Consistent Growth";

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
    if (!history || history.length === 0) return { consistency: "B-", tilt: "Unknown", team: "Neutral" };
    // Logic for Behavioral Stats
    // Consistency: Variance in Gold/Min
    const gpmList = history.map(g => {
      const id = g.participantIdentities?.find(i => i.player.puuid === displayUser?.puuid)?.participantId;
      const p = g.participants?.find(part => part.participantId === id);
      return (p?.stats?.goldEarned || 0) / (g.gameDuration / 60);
    });
    const avgGPM = gpmList.reduce((a, b) => a + b, 0) / (gpmList.length || 1);
    const variance = gpmList.reduce((a, b) => a + Math.pow(b - avgGPM, 2), 0) / (gpmList.length || 1);
    const stdDev = Math.sqrt(variance);
    const consistencyScore = stdDev < 50 ? "S+" : stdDev < 80 ? "A" : stdDev < 120 ? "B" : "C";

    // Tilt: Loss streak impact
    // Simple heuristic: Are stats worse after a loss?
    // For now, simpler: Comeback rate (Win after loss)
    let lossEvents = 0;
    let redeemed = 0;
    for (let i = 1; i < history.length; i++) {
      const prevGame = history[i];
      const prevId = prevGame.participantIdentities?.find(id => id.player.puuid === displayUser?.puuid)?.participantId;
      const prevWin = prevGame.participants?.find(p => p.participantId === prevId)?.stats.win;

      if (!prevWin) {
        lossEvents++;
        const currGame = history[i - 1]; // history is sorted new to old usually? Assuming yes.
        const currId = currGame.participantIdentities?.find(id => id.player.puuid === displayUser?.puuid)?.participantId;
        const currWin = currGame.participants?.find(p => p.participantId === currId)?.stats.win;
        if (currWin) redeemed++;
      }
    }
    const tiltResilience = lossEvents === 0 ? "Untested" : (redeemed / lossEvents) > 0.5 ? "Resilient" : "Prone to Tilt";

    // Objective Control
    // High damage to objectives
    let objDmg = 0;
    history.forEach(g => {
      const id = g.participantIdentities?.find(i => i.player.puuid === displayUser?.puuid)?.participantId;
      const p = g.participants?.find(part => part.participantId === id);
      objDmg += (p?.stats?.damageDealtToObjectives || 0);
    });
    const avgObj = objDmg / (history.length || 1);
    const objectiveControl = avgObj > 20000 ? "Mastermind" : avgObj > 10000 ? "Controller" : "Valid";

    return { consistency: consistencyScore, tilt: tiltResilience, objective: objectiveControl };
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
              Chargement des donnÃƒÂ©es...
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
        <div className="relative z-10 flex flex-col items-center p-10 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl max-w-sm w-full mx-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500/20 to-black flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(239,68,68,0.2)] mb-6 ring-1 ring-white/5">
            <Ghost className="text-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" size={36} strokeWidth={1.5} />
          </div>

          <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">{t('profile_not_found_title')}</h2>
          <p className="text-gray-400 text-center text-sm mb-8 leading-relaxed font-medium">
            {t('profile_not_found_desc')}
          </p>

          <button
            onClick={() => onBack ? onBack() : (onSearch && onSearch(""))}
            className="w-full py-3.5 bg-gradient-to-r from-white/10 to-transparent hover:from-white/15 border border-white/5 hover:border-white/20 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 group active:scale-95 shadow-lg"
          >
            <ChevronLeft size={16} className="text-gray-400 group-hover:text-white group-hover:-translate-x-1 transition-all" />
            {t('back_btn')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("h-full flex flex-col gap-2 animate-in fade-in", panelClass, "p-0! overflow-y-auto custom-scrollbar bg-white dark:bg-[#0a0a0c] transition-colors duration-300")}>
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
              <div className="absolute -top-3 -left-3 bg-[#5c7ce5] text-white font-bold px-2 py-0.5 rounded-lg text-xs shadow-lg z-20 uppercase">{displayUser?.region || "EUW"}</div>
              {displayUser?.summonerLevel > 0 && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#1e1e24] text-white font-bold px-3 py-1 rounded-lg text-sm border border-[#2d2d35] z-20">{displayUser.summonerLevel}</div>
              )}
            </div>
            <div className="mt-2">
              <h1 className="text-3xl font-semibold text-white tracking-tight mb-0 leading-tight italic">{displayUser?.gameName || displayUser?.displayName || "Summoner"}</h1>
              <div className="text-lg text-gray-400 font-normal uppercase flex items-center gap-3">
                <span>#{displayUser?.tagLine || displayUser?.region || "EUW"}</span>
              </div>
              {/* Partial Profile Warning */}
              {displayUser?.isPartial && (
                <div className="mt-2 text-xs text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded border border-yellow-500/20 inline-block">
                  Stats Unavailable (External Region)
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
                      <span className="text-xs font-semibold text-gray-400 tracking-wide uppercase">{t('connected')}</span>
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
      <div className="grid grid-cols-12 gap-6 px-8 pb-0 items-start">

        {/* Left Column: Match History */}
        <div className="col-span-5 flex flex-col gap-6 min-h-0">

          {/* Filters */}
          <div className="flex gap-2 pb-2 overflow-x-auto no-scrollbar">
            {
              ['All', 'Solo', 'Flex', 'Draft', 'Others'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn("px-4 py-1.5 rounded-lg text-[10px] font-semibold transition-all whitespace-nowrap uppercase tracking-tighter", filter === f ? "bg-white text-black" : "bg-white/5 text-gray-400 hover:bg-white/10")}
                >
                  {f === 'All' ? t('all') : f === 'Solo' ? t('solo_duo') : f === 'Flex' ? t('flex') : f === 'Draft' ? t('draft') : f === 'Others' ? t('others') : t('all')}
                </button>
              ))
            }
          </div>
          <div className="flex-1 flex flex-col h-full min-h-0">
            {/* Match History Container - Rounded Frame with internal scrolling */}
            <div className="bg-white/5 dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-white/10 p-4 flex flex-col gap-3 h-[520px] overflow-hidden shadow-2xl">
              <div className="shrink-0 flex items-center justify-between">
                <h3 className="text-gray-400 text-xs font-bold uppercase flex items-center gap-2">
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
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-500 bg-white/5 rounded-2xl border border-white/5 min-h-[300px]">
                    <Activity className="w-24 h-24 opacity-20 mb-4" strokeWidth={1} />
                    <div className="font-bold">{t('no_match_found')}</div>
                  </div>
                ) : (
                  filteredHistory.map((game, i) => (
                    <HistoryRowV2
                      key={i}
                      game={game}
                      puuid={displayUser?.puuid}
                      onClick={() => setSelectedGame(game)}
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
                />
              </div>
            </div>
          </div>

          <BehavioralCard data={behavioral} />
        </div>

        {/* Middle Column: Stats Cards */}
        < div className="col-span-4 flex flex-col gap-6" >
          {/* Rank Section (Modern Style) */}
          < div className="flex flex-col" >
            <ModernRankCard
              type={t('solo_duo')}
              data={rankedStats?.queueMap?.RANKED_SOLO_5x5}
              panelClass={panelClass}
              t={t}
            />
          </div >

          {/* Lens Card (Radar Chart) - Moved here as requested */}
          < LensCard data={lensData} t={t} />

          {/* Records Card (Modern Style) */}
          < div className="bg-white/5 dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-white/10 p-6 relative overflow-hidden group shadow-sm dark:shadow-none min-h-[300px]" >
            {/* Header & Tag */}
            < div className="relative z-10 flex justify-between items-center mb-6" >
              <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Records</h3>
              <div className="bg-yellow-500/10 text-yellow-500 text-[9px] font-black px-2 py-0.5 rounded border border-yellow-500/20 uppercase tracking-tight">Season Best</div>
            </div >

            {/* Grid */}
            < div className="relative z-10 grid grid-cols-2 gap-4 h-[calc(100%-2rem)]" >
              <RecordMiniItem
                icon={Sword}
                val={records.kills}
                label="Most Kills"
                iconBg="bg-red-500/10"
                color="text-red-400"
              />
              <RecordMiniItem
                icon={Zap}
                val={records.damage}
                label="Dmg Dealt"
                iconBg="bg-purple-500/10"
                color="text-purple-400"
              />
              <RecordMiniItem
                icon={Eye}
                val={records.vision}
                label="Vision Score"
                iconBg="bg-emerald-500/10"
                color="text-emerald-400"
              />
              <RecordMiniItem
                icon={Crosshair}
                val={records.csm}
                label="CS / Min"
                iconBg="bg-orange-500/10"
                color="text-orange-400"
              />
            </div >

            {/* Trophy Watermark */}
            < div className="absolute top-4 right-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-1000 transform scale-[2] pointer-events-none" >
              <Trophy size={120} className="text-white" />
            </div >
          </div >




        </div >

        {/* Right Column: Pings & Teammates */}
        < div className="col-span-3 flex flex-col gap-6" >
          {/* Teammates Card */}
          < div className="flex-1 bg-white/5 dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-white/10 p-6 min-h-0 overflow-hidden flex flex-col shadow-2xl" >
            <h3 className="text-gray-400 text-xs font-bold uppercase flex items-center gap-2 mb-4">
              <Users size={12} /> {t('recent_players')}
            </h3>
            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
              {teammates.length > 0 ? teammates.map((p, i) => (
                <div
                  key={i}
                  onClick={() => onSearch && onSearch({ name: p.searchName, puuid: p.puuid, region: displayUser?.region || currentUser?.region || 'EUW', skipLcu: false })}
                  className="flex items-center justify-between group hover:bg-white/5 p-2 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img src={`https://ddragon.leagueoflegends.com/cdn/16.1.1/img/profileicon/${p.icon || 29}.png`} className="w-8 h-8 rounded-lg border border-white/10" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white truncate max-w-[80px]" title={p.name}>{p.name}</span>
                      <span className="text-[9px] text-gray-500">{p.count} Games played</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={cn("text-xs font-bold", p.count > 0 && (p.wins / p.count) >= 0.5 ? "text-green-400" : "text-red-400")}>
                      {p.count > 0 ? Math.round((p.wins / p.count) * 100) : 0}% WR
                    </div>
                  </div>
                </div>
              )) : <div className="text-gray-500 text-xs text-center mt-4 italic">No frequent partners found in recent games</div>}
            </div>
          </div >

          {/* Top Champions Card */}
          < div className="bg-white/5 dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-white/10 p-6 min-h-0 overflow-hidden flex flex-col shadow-2xl" >
            <h3 className="text-gray-400 text-xs font-bold uppercase flex items-center gap-2 mb-4">
              <Trophy size={12} /> {t('top_champions')}
            </h3>
            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
              {topChamps.length > 0 ? topChamps.map((c, i) => {
                const wr = Math.round((c.wins / c.count) * 100);
                const kda = c.d === 0 ? "Perfect" : ((c.k + c.a) / c.d).toFixed(2);
                return (
                  <div
                    key={i}
                    onClick={() => onChampClick && onChampClick(c.name)}
                    className="flex items-center justify-between group hover:bg-white/5 p-2 rounded-xl transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/16.1.1/img/champion/${normalizeChampName(c.name)}.png`}
                        className="w-8 h-8 rounded-lg border border-white/10"
                        onError={(e) => e.target.src = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png"}
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-white truncate max-w-[80px]" title={c.name}>{c.name}</span>
                        <span className="text-[9px] text-gray-500">{c.count} Games played</span>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <div className={cn("text-xs font-bold", wr >= 50 ? "text-green-400" : "text-red-400")}>
                        {wr}% WR
                      </div>
                      <span className="text-[9px] text-gray-400 font-mono">{kda} KDA</span>
                    </div>
                  </div>
                )
              }) : <div className="text-gray-500 text-xs text-center mt-4 italic">No recent champion stats</div>}
            </div>
          </div >



          {/* New Preferred Roles Card */}
          < div className="bg-white/5 dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-2xl" >
            <h3 className="text-gray-400 text-xs font-bold uppercase flex items-center gap-2 mb-6">
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
                    <div className="text-lg font-bold text-white mt-1">{pct}%</div>
                    <div className="text-[9px] text-gray-500 font-medium">{count} parties</div>
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

function LensCard({ data, t }) {
  const points = [
    { label: "Aggression", value: data.aggression, angle: -90 },
    { label: "Objective", value: data.objective, angle: -18 },
    { label: "Farming", value: data.farming, angle: 54 },
    { label: "Vision", value: data.vision, angle: 126 },
    { label: "Survival", value: data.survival, angle: 198 },
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

  return (
    <div className="bg-white/5 dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-white/10 p-6 relative overflow-hidden flex flex-col items-center group shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-h-[420px] transition-all duration-500 hover:border-blue-500/20">
      {/* Decorative background glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="w-full flex justify-between items-center mb-6 z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-blue-500/10 rounded-lg">
            <ScanEye size={14} className="text-blue-400" />
          </div>
          <h3 className="text-white font-bold text-xs uppercase tracking-[0.1em]">Lens</h3>
        </div>
        <span className="text-[10px] text-gray-500 font-medium bg-white/5 px-2 py-0.5 rounded-full border border-white/5">Last 20 Games</span>
      </div>

      <div className="relative flex items-center justify-center mb-6" style={{ width: size, height: size }}>
        {/* Glow behind chart */}
        <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

        <svg width={size} height={size} className="overflow-visible z-10 filter drop-shadow-[0_0_15px_rgba(59,130,246,0.1)]">
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
            <div key={i} className="absolute text-[9px] font-black text-gray-400 bg-[#1e1e24] px-2.5 py-1 rounded-md border border-white/5 shadow-2xl uppercase tracking-tighter" style={{
              left: x,
              top: y,
              transform: 'translate(-50%, -50%)'
            }}>
              {p.label}
            </div>
          )
        })}
      </div>

      <div className="w-full grid grid-cols-2 gap-3 mt-auto z-10">
        <div className="bg-[#1e1e24]/60 backdrop-blur-md rounded-2xl p-4 border border-white/5 flex flex-col items-start gap-1 hover:bg-[#1e1e24] transition-all group/box overflow-hidden relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50"></div>
          <span className="text-[8px] text-gray-500 font-bold uppercase tracking-[0.2em]">Playstyle</span>
          <span className="text-sm font-black text-blue-400 leading-tight uppercase tracking-tight">{data.playstyle}</span>
        </div>
        <div className="bg-[#1e1e24]/60 backdrop-blur-md rounded-2xl p-4 border border-white/5 flex flex-col items-start gap-1 hover:bg-[#1e1e24] transition-all group/box overflow-hidden relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500/50"></div>
          <span className="text-[8px] text-gray-500 font-bold uppercase tracking-[0.2em]">Focus</span>
          <span className="text-sm font-black text-yellow-500 leading-tight uppercase tracking-tight">{data.focus}</span>
        </div>
      </div>
    </div>
  );
}

function BehavioralCard({ data }) {
  const items = [
    { label: "Consistency", sub: "Based on GPM variance", val: data.consistency, color: data.consistency === "S+" ? "text-yellow-400" : data.consistency === "A" ? "text-green-400" : "text-white" },
    { label: "Tilt Resilience", sub: "Win rate after loss", val: data.tilt, isBadge: true, color: data.tilt === "Resilient" ? "text-green-400" : "text-red-400" },
    { label: "Objective Control", sub: "Avg. Dmg to Objectives", val: data.objective, color: "text-blue-300" },
    { label: "Team Synergy", sub: "Participation & Roams", val: data.synergy || "N/A", color: "text-violet-400" },
    { label: "Vision Control", sub: "Wards/Min", val: data.vision || "N/A", color: "text-teal-400" },
    { label: "Early Aggression", sub: "First Blood Rate", val: data.aggression || "N/A", color: "text-orange-400" }
  ];

  return (
    <div className="bg-white/5 dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-white/10 p-6 relative overflow-hidden flex flex-col gap-6 group hover:border-purple-500/20 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-2.5 z-10">
        <div className="p-1.5 bg-purple-500/10 rounded-lg">
          <Brain size={14} className="text-purple-400" />
        </div>
        <h3 className="text-white font-bold text-xs uppercase tracking-[0.1em]">Behavioral Analysis</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 z-10">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 bg-[#1e1e24]/40 backdrop-blur-md rounded-2xl border border-white/5 hover:bg-[#1e1e24] transition-all duration-300 group/item">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{item.label}</span>
              <span className="text-[8px] text-gray-400/50 hidden lg:block">{item.sub}</span>
            </div>
            {item.isBadge ? (
              <span className={cn("text-[10px] font-black px-2.5 py-1 rounded-lg bg-black/40 border border-white/5 uppercase tracking-tighter", item.color)}>
                {item.val}
              </span>
            ) : (
              <span className={cn("text-xs font-black italic uppercase tracking-tighter", item.color)}>
                {item.val}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Background decoration */}
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/5 rounded-full blur-[60px] pointer-events-none"></div>
    </div>
  );
}

function RecordMiniItem({ icon: Icon, val, label, iconBg, color }) {
  return (
    <div className="bg-[#1e1e24]/40 backdrop-blur-sm rounded-2xl p-4 flex flex-col justify-between border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1.5 group relative overflow-hidden">
      <div className="absolute -top-2 -right-2 w-10 h-10 bg-white/5 rounded-full blur-xl pointer-events-none group-hover:bg-white/10 transition-colors"></div>

      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-500", iconBg)}>
        <Icon size={18} className={color} />
      </div>
      <div className="mt-6">
        <div className="text-3xl font-black text-white tracking-tighter drop-shadow-md">{val}</div>
        <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.1em] mt-1 opacity-70 group-hover:opacity-100 transition-opacity">{label}</div>
      </div>
    </div>
  );
}

function StatBox({ label, value, trend, trendUp, graph, t }) {
  return (
    <div className="bg-black/20 backdrop-blur-md rounded-xl p-3 border border-white/5 flex flex-col justify-between h-20 relative overflow-hidden group hover:border-white/10 hover:bg-black/30 transition-colors">
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="text-[10px] text-gray-400 font-bold uppercase">{label}</div>
        <div className="text-xl font-bold text-white shadow-black drop-shadow-md">{value}</div>
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

function ModernRankCard({ type, data, panelClass, t }) {
  if (!data || !data.tier || data.tier === 'UNRANKED') {
    return (
      <div className={cn("p-6 rounded-3xl relative overflow-hidden group border border-white/5 bg-black/40", panelClass)}>
        <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-2 opacity-60">{type}</div>
        <div className="text-xl font-bold text-white/20 italic tracking-tighter">NON CLASSÃƒâ€°</div>
      </div>
    );
  }

  const winRate = Math.round((data.wins / (data.wins + data.losses || 1)) * 100);
  const tierMap = {
    'IRON': 'FER', 'BRONZE': 'BRONZE', 'SILVER': 'ARGENT', 'GOLD': 'OR',
    'PLATINUM': 'PLATINE', 'EMERALD': 'Ãƒâ€°MERAUDE', 'DIAMOND': 'DIAMANT',
    'MASTER': 'MAÃƒÅ½TRE', 'GRANDMASTER': 'GRAND MAÃƒÅ½TRE', 'CHALLENGER': 'CHALLENGER'
  };
  const tierDisplay = tierMap[data.tier.toUpperCase()] || data.tier;

  // Stable random rank
  const globalRank = useMemo(() => Math.floor(Math.random() * 2000000 + 1000000).toLocaleString(), []);

  return (
    <div className={cn("p-6 rounded-3xl relative overflow-hidden group border border-white/10 bg-white/5 dark:bg-black/20 backdrop-blur-xl hover:bg-black/40 transition-all duration-500", panelClass)}>
      {/* Dynamic Glow */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 bg-gradient-to-br",
        data.tier.toLowerCase() === 'gold' ? "from-yellow-400" :
          data.tier.toLowerCase() === 'platinum' ? "from-cyan-400" :
            data.tier.toLowerCase() === 'diamond' ? "from-blue-400" :
              data.tier.toLowerCase() === 'emerald' ? "from-green-400" : "from-gray-400"
      )}></div>

      <div className="relative z-10">
        <div className="text-[10px] text-gray-500 font-medium uppercase tracking-[0.2em] mb-2 opacity-60">
          {type}
        </div>

        <div className="flex flex-col gap-0.5 mb-1.5">
          <h3 className="text-2xl font-semibold bg-gradient-to-br from-white via-white/80 to-gray-400 bg-clip-text text-transparent tracking-tight uppercase italic leading-tight pr-2">
            {tierDisplay} {data.division}
          </h3>
          <span className="text-[10px] text-gray-400 font-mono opacity-80">#{globalRank}th</span>
        </div>

        <div className="flex items-baseline gap-3 mt-1">
          <div className="text-xl font-medium text-white/90 tracking-tight">
            {data.leaguePoints} <span className="text-[10px] text-gray-500 font-medium uppercase ml-0.5 opacity-40 tracking-wider">LP</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-normal leading-none mb-0.5">
            <span className="text-gray-400/60">{data.wins}W - {data.losses}L</span>
            <span className={cn(winRate >= 50 ? "text-blue-400/80" : "text-red-400/80")}>
              ({winRate}%)
            </span>
          </div>
        </div>
      </div>

      {/* Emblem Watermark - Gigantic & Atmospheric */}
      <div className="absolute top-1/2 -right-20 -translate-y-1/2 opacity-[0.1] group-hover:opacity-25 transition-all duration-1000 transform rotate-[10deg] group-hover:rotate-0 scale-[2.1] group-hover:scale-[2.4] pointer-events-none filter blur-[0.5px] group-hover:blur-0">
        <img
          src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${data.tier.toLowerCase()}.png`}
          className="w-80 h-80 object-contain brightness-105 saturate-[1.05]"
          onError={(e) => { e.target.src = "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-unranked.png" }}
        />
      </div>
    </div>
  );
}


function HistoryRowV2({ game, puuid, onClick }) {
  const identity = game.participantIdentities.find(i => i.player.puuid === puuid);
  if (!identity) return null;
  const part = game.participants?.find(p => p.participantId === identity.participantId);
  if (!part || !part.stats) return null;

  const isWin = part.stats.win;
  const champId = part.championId;
  const champName = part.championName || "";
  const champIcon = (champId && champId > 0)
    ? `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${champId}.png`
    : `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion || "15.1.1"}/img/champion/${normalizeChampName(champName)}.png`;

  const kdaRatio = ((part.stats.kills + part.stats.assists) / Math.max(1, part.stats.deaths)).toFixed(2);

  const queueName = getQueueName(game);

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
      "relative flex items-center gap-3 p-2 rounded-2xl transition-all border-l-4 overflow-hidden min-h-[4rem] group cursor-pointer hover:scale-[1.01]",
      isWin
        ? "bg-gradient-to-r from-[#28344e] to-[#1e232e] border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]"
        : "bg-gradient-to-r from-[#4e2828] to-[#2e1e1e] border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)]"
    )}>
      {/* Champion & Role - Matches Screenshot */}
      <div className="relative shrink-0 ml-1">
        <img src={champIcon} className={cn("w-10 h-10 rounded-lg border shadow-sm z-10 relative object-cover", isWin ? "border-blue-400/50" : "border-red-400/50")} />
        {roleIcon && (
          <div className="absolute -bottom-1.5 -left-1.5 bg-black border border-white/40 rounded-full w-4 h-4 flex items-center justify-center z-20 p-0.5 shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <img src={roleIcon} className="w-full h-full brightness-0 invert" />
          </div>
        )}
      </div>

      {/* Main Stats */}
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5 ml-2">
        <div className="flex items-center gap-2 mb-0.5">
          <span className={cn("font-bold italic text-sm", isWin ? "text-blue-300" : "text-red-300")}>{isWin ? "Victory" : "Defeat"}</span>
          <span className="text-[9px] font-bold text-gray-400 uppercase bg-black/30 px-1.5 py-0.5 rounded border border-white/5">{queueName}</span>
        </div>
        <div className="flex items-baseline gap-1.5 text-xs text-white">
          <span className="font-bold">{part.stats.kills}</span>
          <span className="text-gray-500">/</span>
          <span className="font-bold text-red-400">{part.stats.deaths}</span>
          <span className="text-gray-500">/</span>
          <span className="font-bold">{part.stats.assists}</span>
          <span className="text-[10px] text-gray-400 ml-1 opacity-70 font-mono">{kdaRatio} KDA</span>
        </div>
      </div>

      {/* Side Stats */}
      <div className="flex flex-col items-end justify-center text-right gap-0.5 mr-1">
        <div className="text-xs font-bold text-gray-300">{part.stats.totalMinionsKilled + part.stats.neutralMinionsKilled} CS</div>
        <div className="text-[10px] text-gray-500 font-mono">{Math.floor(game.gameDuration / 60)}m {game.gameDuration % 60}s</div>
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
      <div className="font-bold text-white">{value}</div>
      <div className="text-[10px] text-gray-500 font-mono">{avg}</div>
    </div>
  )
}

function ChampMiniStats({ name, win, loss, kda }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <img src={`https://ddragon.leagueoflegends.com/cdn/16.1.1/img/champion/${normalizeChampName(name)}.png`} className="w-8 h-8 rounded-full border border-white/20" />
      <div className="text-[10px] text-gray-400">{name}</div>
      <div className="text-[10px] font-bold text-white">{kda} KDA</div>
      <div className="text-[9px] text-gray-500">{win} - <span className="text-red-400">{loss}</span></div>
    </div>
  )
}

// --- New Premium Settings Components ---
function SettingsSection({ title, children, icon: Icon }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 px-4">
        <div className="p-2 rounded-xl bg-accent-primary/10 text-accent-primary">
          <Icon size={18} />
        </div>
        <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

function SettingCard({ icon: Icon, title, desc, action, color = "blue" }) {
  const colorMap = {
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    green: "bg-green-500/10 text-green-400 border-green-500/20",
    orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    red: "bg-red-500/10 text-red-400 border-red-500/20",
    yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
  };

  return (
    <div className="group relative p-5 rounded-[24px] bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300 flex flex-col justify-between gap-4 overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
        <Icon size={80} />
      </div>

      <div className="flex items-start gap-4 relative z-10">
        <div className={cn("p-3 rounded-2xl border shrink-0", colorMap[color] || colorMap.blue)}>
          <Icon size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-black text-white text-sm uppercase tracking-wide mb-1 truncate">{title}</div>
          <p className="text-[10px] text-gray-500 font-bold leading-relaxed line-clamp-2">{desc}</p>
        </div>
      </div>

      <div className="flex items-center justify-end relative z-10 mt-auto pt-2">
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
        "w-11 h-6 rounded-full relative cursor-pointer transition-all duration-500 ease-in-out p-1 border border-white/5",
        active ? "bg-accent-primary shadow-[0_0_15px_rgba(59,130,246,0.3)]" : "bg-black/40"
      )}
    >
      <div className={cn(
        "w-4 h-4 rounded-full shadow-lg transform transition-transform duration-500",
        active ? "translate-x-5 bg-black" : "translate-x-0 bg-white/20"
      )} />
    </div>
  );
}

function SettingsView({ theme, setTheme, visualMode, setVisualMode, language, setLanguage, t, autoAccept, setAutoAccept, autoImportRunes, setAutoImportRunes, flashPosition, setFlashPosition, overlaySettings, setOverlaySettings, panelClass }) {
  const [isEditingLayout, setIsEditingLayout] = useState(false);
  const languages = [
    { code: 'en', label: 'English (US)' },
    { code: 'fr', label: 'FranÃƒÂ§ais' },
    { code: 'es', label: 'EspaÃƒÂ±ol' },
    { code: 'pt', label: 'PortuguÃƒÂªs' },
    { code: 'de', label: 'Deutsch' },
    { code: 'ru', label: 'ÃÂ Ã‘Æ’Ã‘ÂÃ‘ÂÃÂºÃÂ¸ÃÂ¹' },
    { code: 'ja', label: 'Ã¦â€”Â¥Ã¦Å“Â¬Ã¨ÂªÅ¾' },
    { code: 'ko', label: 'Ã­â€¢Å“ÃªÂµÂ­Ã¬â€“Â´' },
    { code: 'zh', label: 'Ã¤Â¸Â­Ã¦â€“â€¡' }
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
        <SettingsSection title="ExpÃƒÂ©rience App" icon={LayoutGrid}>
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
                {[
                  { key: 'D', label: t('flash_left') },
                  { key: 'F', label: t('flash_right') }
                ].map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => setFlashPosition(opt.key)}
                    className={cn("px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all", flashPosition === opt.key ? "bg-accent-primary text-black" : "text-gray-500 hover:text-white")}
                  >
                    {opt.label}
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

        {/* Section: Overlays SpÃƒÂ©cifiques */}
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
    <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex flex-col p-8 animate-in fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">Oracle <span className="text-accent-primary">Layout Editor</span></h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-1">{t('layout_editor_desc')}</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="px-6 py-3 border border-white/10 text-gray-400 font-black uppercase tracking-widest rounded-xl hover:bg-white/5 transition-all">{t('cancel')}</button>
          <button onClick={save} className="px-10 py-3 bg-accent-primary text-black font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-xl shadow-accent-primary/20">{t('save_layout')}</button>
        </div>
      </div>

      <div className="flex-1 relative bg-black/40 border-2 border-dashed border-white/10 rounded-[40px] overflow-hidden group">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none uppercase font-black text-8xl text-white select-none">{t('game_space')}</div>

        <DraggableBox label="Win% Prediction" x={positions?.winrate?.x ?? 40} y={positions?.winrate?.y ?? 5} color="blue" onMove={(pos) => setPositions(p => ({ ...p, winrate: pos }))} />
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

  // Mapping minor runes used in CLASS_BUILDS
  const minorMap = {
    "8224": "perk-images/Styles/Sorcery/NullifyingOrb/Axiom_Arcanist.png", // Corrected per new JSON?
    "8210": "perk-images/Styles/Sorcery/Transcendence/Transcendence.png",
    "8237": "perk-images/Styles/Sorcery/Scorch/Scorch.png",
    "8139": "perk-images/Styles/Domination/TasteOfBlood/GreenTerror_TasteOfBlood.png",
    "8106": "perk-images/Styles/Domination/UltimateHunter/UltimateHunter.png",
    "8143": "perk-images/Styles/Domination/SuddenImpact/SuddenImpact.png",
    "8138": "perk-images/Styles/Domination/EyeballCollection/EyeballCollection.png", // Eyeball
    "8105": "perk-images/Styles/Domination/RelentlessHunter/RelentlessHunter.png",
    "8009": "perk-images/Styles/Precision/PresenceOfMind/PresenceOfMind.png",
    "8014": "perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png",
    "9104": "perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png",
    "8304": "perk-images/Styles/Inspiration/MagicalFootwear/MagicalFootwear.png",
    "8347": "perk-images/Styles/Inspiration/CosmicInsight/CosmicInsight.png",
    "8446": "perk-images/Styles/Resolve/Demolish/Demolish.png",
    "8429": "perk-images/Styles/Resolve/Conditioning/Conditioning.png",
    "8451": "perk-images/Styles/Resolve/Overgrowth/Overgrowth.png",
    "9111": "perk-images/Styles/Precision/Triumph.png", // Check path?
    "8299": "perk-images/Styles/Sorcery/LastStand/LastStand.png",
    "8444": "perk-images/Styles/Resolve/SecondWind/SecondWind.png",
    "8453": "perk-images/Styles/Resolve/Revitalize/Revitalize.png"
  };

  if (minorMap[id]) return `https://ddragon.leagueoflegends.com/cdn/img/${minorMap[id]}`;

  return `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7200_Domination.png`; // Fallback
}



function BuildView({ t, panelClass, initialChamp, ddragonVersion }) {
  const champName = initialChamp || "Olaf";
  const [data, setData] = useState(null);
  const version = ddragonVersion || "16.1.1";

  useEffect(() => {
    async function fetchChamp() {
      if (!champName) return;
      try {
        // 1. Fetch Static Data from DDragon
        const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${champName}.json`);
        const json = await res.json();
        const c = json.data[champName];

        const mainRole = c.tags ? c.tags[0] : "Fighter";
        const buildInfo = CLASS_BUILDS[mainRole] || CLASS_BUILDS["Fighter"];

        // 2. Fetch Real Build Data from Scraper
        let scraped = null;
        try {
          scraped = await window.ipcRenderer.invoke('scraper:get-champion-build', champName, mainRole);
        } catch (err) {
          console.error("Scraper build fetch failed", err);
        }

        // Generate Tier based on a random seeded by champ name char code to be consistent (Fallback)
        const seed = champName.charCodeAt(0) + (champName.charCodeAt(1) || 0);
        const tiers = ["S+", "S", "A", "B", "C", "D", "E"];
        const tier = scraped?.stats?.tier || tiers[seed % 4];

        // Stats Generation Helper (Fallback)
        const rng = (base, varr) => (base + (seed % varr) + Math.random()).toFixed(1);
        const wr = scraped?.stats?.winRate || `${rng(48, 5)}%`;

        // Synergies / Counters logic (Still mock for now as scraper doesn't do it yet)
        const mockChamps = ["Ahri", "Yasuo", "Zed", "Lux", "LeeSin", "Thresh", "Jinx", "Darius", "Irelia", "Riven"];
        const goodAgainst = mockChamps.filter((_, i) => (i + seed) % 2 === 0).slice(0, 5).map(n => ({ id: n, name: n, wr: rng(53, 5) }));
        const badAgainst = mockChamps.filter((_, i) => (i + seed) % 2 !== 0).slice(0, 5).map(n => ({ id: n, name: n, wr: rng(42, 5) }));

        setData({
          name: c.name,
          title: c.title,
          rank: scraped?.stats?.rank || `${Math.floor(Math.random() * 50) + 1}`,
          tier: tier,
          wr: wr,
          pick: scraped?.stats?.pickRate || `${rng(5, 10)}%`,
          ban: scraped?.stats?.banRate || `${rng(10, 20)}%`,
          matches: `${(seed * 200).toLocaleString()}`,
          role: mainRole,
          runes: buildInfo.runes, // Keep structured runes for now, but hydrate active ones if possible
          spells: buildInfo.spells,
          skillOrder: scraped?.skillOrder || buildInfo.skillOrder,
          startItems: buildInfo.startItems,
          boots: buildInfo.boots,
          coreBuild: scraped?.items || buildInfo.coreBuild,
          matchups: { good: goodAgainst, bad: badAgainst },
          raw: c
        });
      } catch (e) {
        console.error("Failed to fetch champ data", e);
      }
    }
    fetchChamp();
  }, [champName, version]);

  const champData = data || {
    name: champName, title: "Loading...",
    tier: "-", rank: "-", wr: "-", pick: "-", ban: "-", matches: "-",
    role: "-",
    runes: { primary: "", ids: [] },
    spells: [], skillOrder: [], startItems: [], boots: [], coreBuild: [],
    matchups: { good: [], bad: [] }
  };

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-5 pb-10">

      {/* 1. Header Card */}
      <div className="glass-panel p-0 relative overflow-hidden rounded-2xl border border-white/10 bg-[#1e1e24]">
        {/* Background Splash */}
        <div className="absolute inset-0">
          <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_0.jpg`} className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e1e24] via-[#1e1e24]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 p-8 flex items-center justify-between">
          <div className="flex gap-6 items-center">
            <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champName}.png`} className="w-20 h-20 rounded-2xl border-2 border-white/10 shadow-2xl" />
            <div>
              <h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-3">
                {champData.name}
                <span className="text-sm font-normal text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">{t('build_runes_season')} 15.1</span>
              </h1>
              <div className="flex items-center gap-4 text-xs font-medium text-gray-400">
                <span className="flex items-center gap-1"><img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-top.png" className="w-4 h-4 opacity-70" /> TOP</span>
                <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                <span>{t('patch')} 15.1</span>
                <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                <span className="text-green-400">{t('recommended_plus')}</span>
              </div>
            </div>
          </div>

          {/* Header Stats */}
          <div className="flex items-center gap-12 bg-black/20 px-8 py-4 rounded-xl border border-white/5 backdrop-blur-sm">
            <div className="text-center">
              <div className={`text-4xl font-black ${champData.tier.includes('S') ? 'text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'text-gray-200'}`}>{champData.tier}</div>
              <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">{t('tier')}</div>
            </div>
            <div className="w-px h-10 bg-white/10"></div>
            <div className="text-center">
              <div className="text-xl font-bold text-white">#{champData.rank}</div>
              <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">{t('rank')}</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white">{champData.wr}</div>
              <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">{t('winrate')}</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-300">{champData.pick}</div>
              <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Pick Rate</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-300">{champData.ban}</div>
              <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">{t('ban')}</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-300">{champData.matches}</div>
              <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Matches</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Grid Layout */}
      <div className="grid grid-cols-12 gap-6">

        {/* Left Col: Runes & Summs (Wide) */}
        <div className="col-span-12 lg:col-span-8 space-y-6">

          {/* Detailed Build Path Block */}
          <div className="glass-panel p-6 border-white/10 bg-[#151518]">
            <div className="grid grid-cols-12 gap-8">

              {/* Spells */}
              <div className="col-span-3 space-y-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">{t('summoner_spells')}</h3>
                <div className="flex gap-4">
                  {champData.spells.slice(0, 2).map((s, i) => (
                    <div key={i} className="group">
                      <img src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/spell/${s}.png`} className="w-12 h-12 rounded-lg border border-white/10 shadow-lg group-hover:border-purple-500/50 transition-colors" />
                      <div className="mt-1 text-[10px] font-bold text-center text-gray-500">{i === 0 ? "52.9%" : "99.1%"}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="col-span-5 space-y-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">{t('skill_order')}</h3>
                <div className="flex items-center gap-3">
                  {['Q', 'W', 'E'].map((k, i) => (
                    <React.Fragment key={k}>
                      <div className="flex flex-col items-center gap-1 group">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-black border transition-all ${k === champData.skillOrder[0] ? 'bg-purple-500 text-white border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.4)]' : 'bg-white/5 text-gray-400 border-white/10'}`}>
                          {k}
                        </div>
                        <div className="text-[9px] font-bold text-gray-600 group-hover:text-gray-400">{i === 0 ? t('max_1st') : i === 1 ? t('max_2nd') : t('max_3rd')}</div>
                      </div>
                      {i < 2 && <ArrowRight size={14} className="text-gray-700 mb-4" />}
                    </React.Fragment>
                  ))}
                  <div className="ml-4 text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">52.6% WR</div>
                </div>
              </div>

              {/* Boots */}
              <div className="col-span-4 space-y-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">{t('boots_options')}</h3>
                <div className="flex gap-3">
                  {champData.boots.map((b, i) => (
                    <div key={i}>
                      <ItemIcon id={b} size="w-10 h-10" />
                      <div className="mt-1 text-[10px] font-bold text-center text-gray-500">{50 + i * 2}%</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-12 w-full h-px bg-white/5 my-2"></div>

              {/* Starter Items */}
              <div className="col-span-4 space-y-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">{t('starters')}</h3>
                <div className="flex gap-3">
                  {champData.startItems.map(i => <ItemIcon key={i} id={i} size="w-10 h-10" />)}
                  <span className="text-xs self-center text-gray-500 font-bold ml-2">53.0% WR</span>
                </div>
              </div>

              {/* Core Build */}
              <div className="col-span-8 space-y-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">{t('core_build_path')}</h3>
                <div className="flex items-center gap-4">
                  {champData.coreBuild.slice(0, 3).map((item, i) => (
                    <React.Fragment key={i}>
                      <div className="relative group">
                        <ItemIcon id={item} size="w-12 h-12" />
                        <div className="absolute -bottom-5 w-full text-center text-[10px] font-bold text-gray-400 group-hover:text-white transition-colors">
                          {i === 0 ? "12m" : i === 1 ? "18m" : "24m"}
                        </div>
                      </div>
                      {i < 2 && <ArrowRight size={16} className="text-gray-600" />}
                    </React.Fragment>
                  ))}
                  <div className="h-8 w-px bg-white/10 mx-2"></div>
                  <div className="flex gap-2 opacity-60 hover:opacity-100 transition-opacity">
                    {champData.coreBuild.slice(3, 6).map(item => <ItemIcon key={item} id={item} size="w-10 h-10" />)}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Matchups & Synergies Grid */}
          <div className="glass-panel p-6 border-white/10 bg-[#151518]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-white text-sm uppercase tracking-widest flex items-center gap-2">
                <Swords size={16} className="text-purple-500" /> {t('matchups_analysis')}
              </h3>
              <div className="flex bg-black/20 p-1 rounded-lg border border-white/5">
                <button className="px-4 py-1.5 bg-white/10 rounded text-[10px] font-bold text-white uppercase shadow hover:bg-white/20 transition-all">{t('matchups')}</button>
                <button className="px-4 py-1.5 hover:bg-white/5 rounded text-[10px] font-bold text-gray-500 uppercase transition-all">Synergies</button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12">
              {/* Good Against */}
              <div>
                <div className="flex justify-between mb-4">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">{t('strong_against')}</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {champData.matchups.good.length > 0 ? champData.matchups.good.map(m => (
                    <MatchupCardV2 key={m.id} champ={m} type="good" />
                  )) : <div className="text-gray-500 text-xs">No Data</div>}
                </div>
              </div>

              {/* Bad Against */}
              <div>
                <div className="flex justify-between mb-4">
                  <span className="text-xs font-bold text-red-400 uppercase tracking-widest text-right block">{t('weak_against')}</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {champData.matchups.bad.length > 0 ? champData.matchups.bad.map(m => (
                    <MatchupCardV2 key={m.id} champ={m} type="bad" />
                  )) : <div className="text-gray-500 text-xs">No Data</div>}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Col: Runes & Leaderboard */}
        <div className="col-span-12 lg:col-span-4 space-y-6">

          {/* Rune Matrix */}
          <div className="glass-panel p-6 border-white/10 bg-[#151518]">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">{t('rune_path')}</h3>

            {/* Primary Tree */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <img src={getRuneUrl("8000")} className="w-6 h-6 grayscale opacity-50" /> {/* Generic Icon Logic would be better here */}
                <span className="font-bold text-white text-sm">{champData.runes.primary}</span>
                <span className="ml-auto text-xs font-bold text-gray-500">52.3% WR</span>
              </div>
              <div className="space-y-4 pl-2 border-l-2 border-white/5 ml-3">
                {/* Mock Visualization of Lines/Rows */}
                {[0, 1, 2, 3].map(row => (
                  <div key={row} className="flex gap-3 ml-4">
                    {[0, 1, 2].map(col => {
                      const isKeystone = row === 0;
                      // Mock selection logic: Simple heuristic for now
                      // We just use the IDs we have to check if "selected"
                      // But since we don't have the full matrix of ALL runes, we will fake the unselected ones
                      // For a real app, we need the full Rune Tree Data. 
                      // Visual Mock:
                      const active = col === 1; // Always select middle for demo visuals if id matches
                      return (
                        <div key={col} className={`rounded-full border transition-all ${active ? 'border-purple-500 bg-purple-500/20 opacity-100 scale-110 shadow-[0_0_10px_rgba(168,85,247,0.3)]' : 'border-transparent opacity-20 bg-white/5 grayscale saturate-0'}`}>
                          <div className={`${isKeystone ? 'w-10 h-10' : 'w-8 h-8'} rounded-full bg-black/50`} />
                        </div>
                      )
                    })}
                    <div className="ml-auto text-[10px] self-center text-gray-600 font-bold">Launch</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary Tree */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-bold text-white text-sm">{champData.runes.secondary}</span>
                <span className="ml-auto text-xs font-bold text-gray-500">12.1% Pick</span>
              </div>
              <div className="space-y-3 pl-2 border-l-2 border-white/5 ml-3">
                <div className="flex gap-3 ml-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.3)]"></div>
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-transparent opacity-20"></div>
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-transparent opacity-20"></div>
                </div>
                <div className="flex gap-3 ml-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-transparent opacity-20"></div>
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.3)]"></div>
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-transparent opacity-20"></div>
                </div>
              </div>
            </div>

            {/* Shards */}
            <div className="mt-8 flex gap-4 justify-center pt-6 border-t border-white/5">
              <div className="w-6 h-6 rounded-full bg-gray-700 border border-white/20"></div>
              <div className="w-6 h-6 rounded-full bg-gray-700 border border-white/20"></div>
              <div className="w-6 h-6 rounded-full bg-gray-700 border border-white/20"></div>
            </div>

          </div>

          {/* Graphs / Trends */}
          <div className="glass-panel p-6 border-white/10 bg-[#151518]">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Winrate Trend (30 Days)</h3>
            <div className="h-32 flex items-end gap-1">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="flex-1 bg-purple-500/20 hover:bg-purple-500 hover:shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all rounded-t-sm" style={{ height: `${30 + Math.random() * 60}%` }}></div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}

function MatchupCardV2({ champ, type }) {
  return (
    <div className="relative group cursor-pointer">
      <div className="aspect-[3/4] relative overflow-hidden rounded-lg border border-white/10 group-hover:border-white/30 transition-all">
        <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.name}_0.jpg`} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

        <div className="absolute bottom-2 inset-x-0 text-center">
          <div className={`text-sm font-black drop-shadow-md ${type === 'good' ? 'text-indigo-400' : 'text-red-400'}`}>{champ.wr}%</div>
          <div className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">{champ.name}</div>
        </div>
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
    <div className={`${size} rounded-full bg-black/40 border border-white/10 flex items-center justify-center p-1 relative group hover:border-purple-400/50 transition-colors`}>
      <img src={url} className="w-full h-full object-contain opacity-80 group-hover:opacity-100" />
    </div>
  );
}

function TierRow({ rank, name, role, winrate, ban, tier }) {
  return (
    <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group">
      <td className="p-4 font-mono text-gray-400">{rank}</td>
      <td className="p-4 font-bold text-gray-900 dark:text-white flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-gray-500"></div>
        {name}
      </td>
      <td className="p-4 text-gray-500">{role}</td>
      <td className="p-4 text-green-500 font-bold">{winrate}</td>
      <td className="p-4 text-gray-500">{ban}</td>
      <td className="p-4">
        <span className={cn("px-2 py-1 rounded text-xs font-bold", tier.includes('S') ? "bg-accent-primary text-white" : "bg-gray-500/20 text-gray-500")}>
          {tier}
        </span>
      </td>
    </tr>
  )
}

// Initial Static Fallback (Will be hydrated by dynamic fetch)
let CHAMP_ID_TO_NAME = {
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
            console.log("Updated DDragon Version:", latest);
          }

          if (latest) {
            const cRes = await fetch(`https://ddragon.leagueoflegends.com/cdn/${latest}/data/en_US/champion.json`);
            const cJson = await cRes.json();
            const data = cJson.data;
            if (data) {
              const list = [];
              Object.keys(data).forEach(key => {
                const c = data[key];
                if (typeof CHAMP_ID_TO_NAME !== 'undefined') CHAMP_ID_TO_NAME[c.key] = c.name;
                list.push(c); // Store full object
              });

              // Sort by name
              const sorted = list.sort((a, b) => a.name.localeCompare(b.name));
              setChampionList(sorted);
              localStorage.setItem('oracle_champ_list_v2', JSON.stringify(sorted));
            }
          }
        } catch (e) {
          console.error("DDragon fetch failed", e);
          if (typeof CHAMP_ID_TO_NAME !== 'undefined' && championList.length === 0) {
            setChampionList(Object.values(CHAMP_ID_TO_NAME).sort());
          }
        }
      };

      // 2. Fetch Patch Notes (Independent)
      const fetchPatchNotes = async () => {
        try {
          if (window.ipcRenderer) {
            // Run in background, don't block
            const notes = await window.ipcRenderer.invoke('scraper:get-patch-notes');
            if (Array.isArray(notes) && notes.length > 0) {
              setPatchNotes(notes);
              localStorage.setItem('oracle_patch_notes', JSON.stringify(notes));
            }
          }
        } catch (e) { console.error("Patch Notes fetch failed", e); }
      };

      Promise.all([fetchDDragon(), fetchPatchNotes()]);
    }

    init();
  }, []); // Run once on mount

  return { ddragonVersion, patchNotes, championList };
}



const getQueueLabel = (queueId) => {
  if (queueId === 420) return "Solo/Duo";
  if (queueId === 440) return "Flex";
  if (queueId === 450) return "ARAM";
  if (queueId === 400 || queueId === 430) return "Normal";
  if (queueId === 1700) return "Arena";
  return "Mode Inconnu";
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
      const identity = fullGame.participantIdentities?.find(ident => ident.player.puuid === currentUser.puuid);
      const p = fullGame.participants.find(part => part.participantId === identity?.participantId) || fullGame.participants[0];

      const mode = getQueueLabel(fullGame.queueId);
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
          <h2 className="text-3xl font-black text-white flex items-center gap-3 tracking-tighter">
            <MonitorPlay className="text-accent-primary" /> Analyse
          </h2>
          <p className="text-gray-500 text-sm font-medium mt-1">{t('replays_desc')}</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/5 flex flex-col items-end">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t('games_found')}</span>
            <span className="text-xl font-black text-white">{replays.length}</span>
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
            const identity = r.participantIdentities?.find(ident => ident.player.puuid === currentUser.puuid);
            const p = r.participants.find(part => part.participantId === identity?.participantId) || r.participants[0];
            const state = r.replayMeta?.state; // 'WATCH' or 'downloading' etc
            const isWatchable = state === 'WATCH';
            const isDownloading = downloadingId === r.gameId; // simplified local state tracking
            const mode = getQueueLabel(r.queueId);
            const champName = getChampName(p.championId);

            return (
              <div
                key={r.gameId}
                onClick={() => loadFullGame(r)}
                className={cn(
                  "glass-panel p-4 flex items-center justify-between group cursor-pointer border transition-all hover:scale-[1.02] hover:shadow-xl",
                  coachingGame?.gameId === r.gameId ? "border-accent-primary bg-accent-primary/10 shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "border-white/5 hover:border-white/20"
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
                    <div className="font-bold text-white flex items-center gap-2">
                      {p.stats.kills}/{p.stats.deaths}/{p.stats.assists}
                      <span className={cn("text-[9px] px-1.5 py-0.5 rounded-md font-black italic", p.stats.win ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400")}>
                        {p.stats.win ? "VICTOIRE" : "DÃƒâ€°FAITE"}
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-500 font-mono uppercase mt-0.5">
                      {champName} Ã¢â‚¬Â¢ {mode}
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
                          : "bg-white/5 text-gray-600 border border-white/5 cursor-not-allowed opacity-50"
                      )}
                      title={isWatchable ? t('watch_replay') : undefined}
                    >
                      {isWatchable ? <Play size={16} fill="currentColor" /> : <ArrowDown size={16} />}
                    </button>
                    {!isWatchable && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-[#0a0a0c]/90 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-300 backdrop-blur-md shadow-2xl opacity-0 scale-90 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50 flex items-center gap-2">
                        <Clock size={10} className="text-accent-primary" />
                        <span>A venir...</span>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0a0a0c]/90 border-r border-b border-white/10 rotate-45"></div>
                      </div>
                    )}
                  </div>
                  <button
                    className={cn(
                      "p-2 rounded-lg transition-all border",
                      coachingGame?.gameId === r.gameId ? "bg-accent-primary/20 text-accent-primary border-accent-primary/30" : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10"
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
              <h3 className="text-xl font-bold text-white mb-2 italic">{t('ai_analyzer_title')}</h3>
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
  const mode = game._mode || getQueueLabel(game.queueId);
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

  // --- 1. CHRONOLOGIE (Analyses Positives/NÃƒÂ©gatives) ---
  const timelineAnalysis = useMemo(() => {
    const positives = [];
    const negatives = [];

    // DATA PREP
    const teamKills = game.participants.filter(pt => pt.teamId === p.teamId).reduce((sum, pt) => sum + (pt.stats?.kills || 0), 0);
    const kp = (stats.kills + stats.assists) / Math.max(1, teamKills);
    const durationMin = game.gameDuration / 60;
    const csm = (stats.totalMinionsKilled + stats.neutralMinionsKilled) / durationMin;
    const goldDiff = opponent ? stats.goldEarned - (opponent.stats?.goldEarned || 0) : 0;

    // 1. COMBAT & KDA
    const kda = (stats.kills + stats.assists) / Math.max(1, stats.deaths);
    if (kda > 4) positives.push(t('pos_kda'));
    else if (kda < 1.5) negatives.push(t('neg_deaths'));

    if (stats.largestMultiKill >= 2) positives.push(t('pos_multikill'));

    if (kp < 0.3 && durationMin > 15) negatives.push(`${t('neg_kp')} (${Math.round(kp * 100)}%)`);
    else if (kp > 0.65) positives.push(t('pos_kp'));

    // 2. FARMING & ECO
    if (csm > 7.5) positives.push(t('pos_farm'));
    else if (csm < 5 && ['TOP', 'MIDDLE', 'BOTTOM'].includes(p.timeline?.lane)) negatives.push(t('neg_farm'));

    if (goldDiff < -2000) negatives.push(t('neg_gold'));
    else if (goldDiff > 2000) positives.push(t('pos_gold'));

    // 3. OBJECTIVES & MACRO
    if (stats.damageDealtToObjectives > 10000) positives.push(t('pos_obj'));
    else if (stats.damageDealtToObjectives < 1500 && durationMin > 20 && p.timeline?.role !== 'SUPPORT') negatives.push(t('neg_obj'));

    // 4. VISION
    if (stats.visionScore > 1.2 * durationMin) positives.push(t('pos_vision'));
    else if (stats.visionScore < 0.5 * durationMin) negatives.push(t('neg_vision'));

    // Role Specific Negatives
    if (roleName === 'Support' && stats.visionScore < 1.5 * durationMin) negatives.push(t('neg_support_vision'));
    if (p.timeline?.lane === 'JUNGLE' && kp < 0.4) negatives.push(t('neg_jungle_impact'));

    // 5. DAMAGE
    const teamDamage = game.participants.filter(pt => pt.teamId === p.teamId).reduce((sum, pt) => sum + (pt.stats?.totalDamageDealtToChampions || 0), 0);
    const dmgShare = stats.totalDamageDealtToChampions / Math.max(1, teamDamage);
    if (dmgShare > 0.3) positives.push(`${t('pos_carry')} (${Math.round(dmgShare * 100)}%)`);
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

  // --- 3. CONSEILS CLÃƒâ€°S (Localized) ---
  const advicePoints = useMemo(() => {
    const points = [];
    const durationMin = game.gameDuration / 60;
    const csm = (stats.totalMinionsKilled + stats.neutralMinionsKilled) / Math.max(1, durationMin);

    if (stats.deaths > 6) points.push(t('tip_deaths_desc'));
    if (csm < 6.5) points.push(t('tip_csm_desc'));
    if (stats.visionScore < 0.8 * durationMin) points.push(t('tip_vision_poor_desc'));
    if (stats.damageDealtToObjectives < 2500 && p.timeline?.role !== 'SUPPORT') points.push(t('tip_objective_desc'));

    // Add general variety if short
    if (points.length < 2) {
      if (stats.win) points.push(t('tip_multikill_desc'));
      else points.push(t('tip_default_desc'));
    }

    return points;
  }, [stats, game, t]);

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

  // --- MATCHUP TIP GENERATOR (Localized) ---
  const matchupTip = useMemo(() => {
    if (!opponent || !p) return t('searching');

    const goldDiff = pStats.gold - oppStats.gold;
    const csDiff = pStats.cs - oppStats.cs;
    const killDiff = pStats.kills - oppStats.kills;
    const deathCount = pStats.deaths;

    let key = 'matchup_default';

    if (goldDiff > 3000 && killDiff > 3) key = 'matchup_stomp';
    else if (stats.win && (goldDiff < -1000 || csDiff < -20)) key = 'matchup_lost_lane_won_game';
    else if (!stats.win && goldDiff > 1000) key = 'matchup_won_lane_lost_game';
    else if (deathCount > 7 && killDiff < -3) key = 'matchup_feeding';
    else if (Math.abs(goldDiff) < 1000 && Math.abs(killDiff) < 2) {
      if (pStats.cs > 8 * (game.gameDuration / 60)) key = 'matchup_passive';
      else key = 'matchup_neutral';
    } else if (stats.visionScore < oppStats.visionScore / 2) key = 'matchup_vision_gap';

    return t(key).replace('{{champ}}', oppChampName || t('opponent'));
  }, [pStats, oppStats, stats, oppChampName, game, t]);

  return (
    <div className="h-full glass-panel p-0 flex flex-col overflow-hidden animate-in zoom-in-95 duration-500 bg-[#0a0a0c]/80 border-white/10 relative">
      {analyzing && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
          <div className="relative">
            <Brain size={48} className="text-accent-primary animate-bounce" />
            <div className="absolute inset-0 bg-accent-primary/20 rounded-full blur-xl animate-pulse"></div>
          </div>
          <span className="text-white font-black italic tracking-widest text-xs">{t('analyzing_caps')}</span>
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
              className="w-16 h-16 rounded-2xl border-2 border-white/20"
            />
            {roleIcon && (
              <div className="absolute -top-2 -right-2 bg-[#0a0a0c] p-1 rounded-lg border border-white/10 shadow-lg hidden">
                <img src={roleIcon} className="w-4 h-4" />
              </div>
            )}
          </div>

          <div className="flex flex-col mb-1">
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-black text-white tracking-tight uppercase italic">{champName}</h3>
              <span className={cn("px-2 py-0.5 rounded-md text-[9px] font-black italic uppercase tracking-widest border", stats.win ? "bg-green-500/10 text-green-400 border-green-500/30" : "bg-red-500/10 text-red-400 border-red-500/30")}>
                {stats.win ? "VICTORY" : "DEFEAT"}
              </span>
            </div>
            <div className="text-gray-400 text-xs font-bold flex items-center gap-2 mt-1">
              <span className="text-accent-primary uppercase tracking-wider">{mode}</span>
              <span className="w-1 h-1 rounded-full bg-white/20"></span>
              <span className="font-mono opacity-60">{(() => { try { return new Date(game.gameCreation).toLocaleDateString(); } catch { return ""; } })()}</span>
            </div>
          </div>
        </div>

        {/* Grade & Action Container - Redesigned to fix overlap and match request */}
        <div className="absolute top-4 right-5 flex flex-col items-end gap-2 z-20">
          <div className="bg-[#15171e]/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/5 flex flex-col items-center min-w-[90px] shadow-2xl transition-all hover:border-blue-500/30">
            <div className="text-3xl font-black italic text-white drop-shadow-md leading-none mb-1">{gameScore}</div>
            <div className="text-[8px] text-[#3b82f6] font-black uppercase tracking-[0.15em]">Oracle Grade</div>
          </div>

          <button
            onClick={() => setShowMatchup(!showMatchup)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[8px] font-black uppercase tracking-wider transition-all duration-300",
              showMatchup
                ? "bg-accent-primary text-black border-accent-primary"
                : "bg-white/5 text-accent-primary border-accent-primary/20 hover:bg-accent-primary/10"
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
          <div className="absolute inset-0 z-40 bg-[#0a0a0c] flex flex-col animate-in slide-in-from-bottom duration-300">
            <div className="h-10 border-b border-white/10 flex items-center justify-between px-4 bg-white/5 shrink-0">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Globe size={12} /> YouTube Guide Browser
              </span>
              <button
                onClick={() => setShowGuide(false)}
                className="text-gray-400 hover:text-white transition-colors"
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
            <div className="bg-white/[0.02] rounded-[32px] border border-white/5 p-8 relative overflow-hidden group flex-1 flex flex-col justify-evenly">
              {/* Background FX */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 via-transparent to-red-500/5 opacity-50"></div>

              {opponent ? (
                <>
                  <div className="flex items-center justify-between relative z-10 w-full mb-4">
                    <div className="flex flex-col gap-1">
                      <h4 className="text-sm font-black text-white uppercase flex items-center gap-3 italic tracking-wide">
                        <Activity size={18} className="text-accent-primary" /> {t('matchups')}
                      </h4>
                      <p className="text-[10px] text-gray-500 font-bold ml-7">{t('matchups')} VS {oppChampName || t('opponent')}</p>
                    </div>
                    <button
                      onClick={() => setShowGuide(true)}
                      className="px-5 py-2 min-w-[100px] bg-white/5 font-black text-white text-[9px] uppercase rounded-xl border border-white/10 hover:bg-white/10 hover:scale-105 transition-all text-center"
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
                      <div className="text-2xl font-black text-white tracking-tight">{pStats.kills}/{pStats.deaths}/{pStats.assists}</div>
                    </div>

                    {/* Middle */}
                    <div className="flex flex-col gap-5 w-full">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[9px] font-black uppercase text-gray-400 px-1">
                          <span>{pStats.gold.toLocaleString()}</span>
                          <span className="text-accent-primary">OR</span>
                          <span>{oppStats.gold.toLocaleString()}</span>
                        </div>
                        <div className="h-2.5 bg-black/40 rounded-full overflow-hidden flex border border-white/5">
                          <div className="h-full bg-accent-primary shadow-[0_0_10px_#3b82f6]" style={{ width: `${(pStats.gold / Math.max(1, pStats.gold + oppStats.gold)) * 100}%` }}></div>
                          <div className="h-full bg-red-500 shadow-[0_0_10px_#ef4444]" style={{ width: `${(oppStats.gold / Math.max(1, pStats.gold + oppStats.gold)) * 100}%` }}></div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[9px] font-black uppercase text-gray-400 px-1">
                          <span>{pStats.cs}</span>
                          <span className="text-blue-400">CS</span>
                          <span>{oppStats.cs}</span>
                        </div>
                        <div className="h-2.5 bg-black/40 rounded-full overflow-hidden flex border border-white/5">
                          <div className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" style={{ width: `${(pStats.cs / Math.max(1, pStats.cs + oppStats.cs)) * 100}%` }}></div>
                          <div className="h-full bg-orange-500 shadow-[0_0_10px_#f97316]" style={{ width: `${(oppStats.cs / Math.max(1, pStats.cs + oppStats.cs)) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="flex flex-col items-center gap-3">
                      <div className="relative group/avatar shrink-0">
                        <div className="absolute inset-0 bg-red-500 blur-xl opacity-20 group-hover/avatar:opacity-40 transition-opacity"></div>
                        <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${opponent.championId}.png`} className="w-16 h-16 rounded-2xl border-2 border-red-500/50 shadow-2xl relative z-10 object-cover" />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full border-2 border-[#0a0a0c] z-20 whitespace-nowrap">{t('rival') || "RIVAL"}</div>
                      </div>
                      <div className="text-2xl font-black text-white tracking-tight">{oppStats.kills}/{oppStats.deaths}/{oppStats.assists}</div>
                    </div>
                  </div>

                  {/* Matchup Tip Bubble */}
                  <div className="relative mt-4 mx-4 p-4 bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-2xl border border-white/10 shadow-lg flex items-start gap-4">
                    <div className="bg-accent-primary/20 p-2 rounded-lg text-accent-primary shrink-0">
                      <Lightbulb size={20} />
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-white uppercase tracking-wider mb-1">{t('view_tips')}</h5>
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

            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[24px]">
              <div className="flex items-center gap-3 text-[10px] font-black text-accent-primary uppercase mb-4 tracking-widest px-2">
                <Sparkles size={14} /> {t('key_tips')}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {advicePoints.slice(0, 2).map((tip, i) => (
                  <div key={i} className="bg-black/30 p-4 rounded-2xl border border-white/5 text-[10px] text-gray-300 font-bold leading-relaxed flex items-start gap-3">
                    <span className="text-accent-primary text-base leading-none mt-0.5">Ã¢â‚¬Â¢</span>
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
              <h4 className="flex items-center gap-2 text-sm font-black text-white uppercase tracking-wider">
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
              <h4 className="flex items-center gap-2 text-sm font-black text-white uppercase tracking-wider">
                <Brain size={16} className="text-accent-primary" /> {t('coach_verdict')}
              </h4>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 relative overflow-hidden group hover:bg-white/[0.07] transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Quote size={64} />
                </div>
                <p className="text-gray-200 text-sm leading-relaxed italic relative z-10 font-bold">
                  "{verdictText}"
                </p>
              </div>
            </section>

            {/* 3. Conseils ClÃƒÂ©s */}
            <section className="space-y-3 pb-2">
              <h4 className="flex items-center gap-2 text-sm font-black text-white uppercase tracking-wider">
                <Target size={16} className="text-accent-primary" /> {t('key_tips')}
              </h4>
              <div className="space-y-3">
                {advicePoints.map((advice, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-[#15171e] border border-white/5 hover:border-accent-primary/30 transition-colors group">
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
    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl text-center">
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
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-16 h-24 bg-white/5 rounded-lg border border-white/5"></div>)}
          </div>
        </div>
      </div>

      {/* Main Content: Build & Config */}
      <div className="flex-1 min-h-0 grid grid-cols-12 gap-6">
        {/* Left: Build Selector */}
        <div className="col-span-3 glass-panel p-0 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/5 font-bold uppercase text-xs text-gray-500">Suggested Builds</div>
          <div className="flex-1 overflow-y-auto">
            <BuildOption name="On-hit Shred" wr={52} pick={12} active />
            <BuildOption name="Bruiser Sustain" wr={50} pick={5} />
            <BuildOption name="Lethality Burst" wr={48} pick={2} />
          </div>
          <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-4">
              <img src="https://ddragon.leagueoflegends.com/cdn/14.1.1/img/profileicon/588.png" className="w-10 h-10 rounded-full" />
              <div>
                <div className="font-bold text-sm">LIDER</div>
                <div className="text-[10px] text-gray-400">25 days ago</div>
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
                <img src="https://ddragon.leagueoflegends.com/cdn/14.1.1/img/spell/SummonerFlash.png" className="w-12 h-12 rounded border border-white/20" />
                <img src="https://ddragon.leagueoflegends.com/cdn/14.1.1/img/spell/SummonerExhaust.png" className="w-12 h-12 rounded border border-white/20" />
                <button className="text-xs text-gray-400 flex items-center gap-1 hover:text-white"><RefreshCw size={12} /> Swap Flash</button>
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
    <div className={cn("relative w-20 h-28 rounded-xl overflow-hidden border transition-all", active ? "border-accent-primary scale-110 z-10 shadow-[0_0_15px_rgba(200,162,200,0.4)]" : "border-white/10 opacity-80")}>
      <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ}_0.jpg`} className="absolute inset-0 w-full h-full object-cover" />
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
    <div className={cn("p-4 border-l-2 cursor-pointer hover:bg-white/5 transition-colors", active ? "border-accent-primary bg-white/5" : "border-transparent")}>
      <div className="font-bold text-sm text-white">{name}</div>
      <div className="flex gap-3 text-xs mt-1">
        <span className="text-green-400">{wr}% WR</span>
        <span className="text-gray-500">{pick} games</span>
      </div>
    </div>
  )
}

function AbilityBox({ keyName, active }) {
  return (
    <div className={cn("w-10 h-10 rounded border flex items-center justify-center font-bold text-xl", active ? "bg-accent-primary text-black border-accent-primary" : "bg-black/40 border-white/20 text-gray-400")}>
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
        <h2 className="text-2xl font-bold text-gray-400">{t('waiting_for_match')}</h2>
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 px-4 py-1 rounded-b-xl border border-white/10 text-[10px] text-gray-400 font-mono z-50">
        {t('toggle_hint')}
      </div>

      <div className="flex justify-between items-end px-4">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Sword className="text-accent-primary" />
            {t('liveMatch') || "Live Match"}
          </h2>
          <p className="text-gray-500 text-sm">{gameData.gameData.mapName} Ã¢â‚¬Â¢ {gameData.gameData.gameMode}</p>
        </div>
        <div className="flex items-center gap-4 text-sm font-mono text-gray-400">
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
      isMe ? "border-accent-primary shadow-[0_0_20px_rgba(200,162,200,0.2)]" : "border-white/5",
      isBlue ? "bg-gradient-to-r from-blue-900/20 to-black/40" : "bg-gradient-to-l from-red-900/20 to-black/40"
    )}>
      {/* Background Splash */}
      <div className={cn("absolute inset-0 opacity-40 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110", isBlue ? "origin-left" : "origin-right")} style={{ backgroundImage: `url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${player.champ}_0.jpg')` }}></div>
      <div className={cn("absolute inset-0 z-0", isBlue ? "bg-gradient-to-r from-transparent via-black/60 to-black" : "bg-gradient-to-l from-transparent via-black/60 to-black")}></div>

      <div className={cn("relative z-10 h-full flex items-center px-4 gap-4", isBlue ? "flex-row" : "flex-row-reverse text-right")}>
        {/* Champ Icon & Spells */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <div className="relative">
            <img src={`https://ddragon.leagueoflegends.com/cdn/16.1.1/img/champion/${normalizeChampName(player.champ)}.png`} className="w-10 h-10 rounded-lg border border-white/20" />
            <div className="absolute -bottom-1 -right-1 bg-black text-[9px] px-1 rounded border border-white/10 text-white font-bold text-center w-5">
              {player.mastery > 100000 ? "M7" : "M5"}
            </div>
          </div>
          <div className="flex gap-1 mt-1">
            {player.spells.map(s => (
              <img
                key={s}
                src={`https://cdn.communitydragon.org/latest/summoner-spell/${s.toLowerCase().replace(' ', '')}/icon`}
                className="w-4 h-4 rounded border border-white/10"
                onError={(e) => { e.target.src = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png" }}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="font-bold text-lg text-white leading-tight flex items-center gap-2">
            {isMe && <span className="text-xs bg-accent-primary text-black px-1 rounded font-bold">{t('you')}</span>}
            {player.name}
          </div>
          <div className={cn("text-xs font-mono", isBlue ? "text-blue-300" : "text-red-300")}>
            {player.rank} Ã¢â‚¬Â¢ {player.wr}% WR
          </div>
        </div>

        {/* Tags/Badges */}
        <div className="flex flex-col gap-1 items-end opacity-80">
          {player.runes && (
            <div className="w-6 h-6 rounded-full bg-black/40 border border-white/10 p-1">
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
    <div className={cn("flex items-center justify-between p-3 rounded-xl border transition-all", highlight ? "bg-accent-primary/20 border-accent-primary" : "bg-white/5 border-transparent")}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-gray-700 flex items-center justify-center text-xs font-bold">{role[0]}</div>
        <div>
          <div className="font-bold text-sm">{name}</div>
          <div className="text-xs text-gray-400">{champion}</div>
        </div>
      </div>
      <div className={cn("text-sm font-bold", winrate > 50 ? "text-green-500" : "text-red-500")}>
        {winrate}% WR
      </div>
    </div >
  )
}

function BanCard({ name }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-12 h-12 rounded-full bg-red-900/50 border-2 border-red-500 flex items-center justify-center text-xs">
        Ã¢ÂÅ’
      </div>
      <span className="text-xs font-medium">{name}</span>
    </div>
  )
}

function StatCard({ title, value, trend, trendUp }) {
  return (
    <div className="p-6 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/20 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{title}</div>
      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{value}</div>
      <div className={cn("text-xs font-bold flex items-center gap-1", trendUp ? "text-green-500" : "text-red-500")}>
        {trend}
        <span className="text-gray-400 font-normal">vs avg</span>
      </div>
    </div>
  )
}

// --- New V2 Components Definitions ---

function MatchupsView({ t, championList, ddragonVersion }) {
  const [champ1, setChamp1] = useState('Irelia');
  const [champ2, setChamp2] = useState('Darius');
  const [selectingStr, setSelectingStr] = useState(null); // 'champ1' or 'champ2'

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-5 pb-12 h-full flex flex-col relative">
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

      <div className="flex items-center justify-between shrink-0">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <Swords className="text-accent-primary" />
          {t('matchups_analysis')}
        </h2>
        <div className="flex gap-4 items-center bg-black/40 p-2 rounded-2xl border border-white/5">
          <button onClick={() => setSelectingStr('champ1')} className="flex items-center gap-3 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10 group">
            <img src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${champ1}.png`} className="w-8 h-8 rounded-full border border-white/20 group-hover:border-accent-primary" />
            <span className="font-bold text-white">{champ1}</span>
          </button>

          <span className="font-bold text-gray-500 italic">VS</span>

          <button onClick={() => setSelectingStr('champ2')} className="flex items-center gap-3 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10 group">
            <span className="font-bold text-white">{champ2}</span>
            <img src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${champ2}.png`} className="w-8 h-8 rounded-full border border-white/20 group-hover:border-red-500" />
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-8 min-h-0">
        {/* Champ 1 */}
        <div className="col-span-4 glass-panel p-0 overflow-hidden relative group">
          <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ1}_0.jpg`} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6">
            <h3 className="text-5xl font-bold text-white tracking-tighter">{champ1}</h3>
            <div className="text-green-400 font-bold text-2xl mt-2 flex items-center gap-2">
              52.1% <span className="text-sm text-gray-400 font-normal uppercase">{t('winrate')}</span>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="px-3 py-1 rounded bg-white/10 border border-white/10 text-xs font-bold text-white">Tier S</div>
              <div className="px-3 py-1 rounded bg-white/10 border border-white/10 text-xs font-bold text-white">Top</div>
            </div>
          </div>
        </div>

        {/* Comparison Stats - Middle */}
        <div className="col-span-4 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2">
          {/* Key Insight Box */}
          <div className="glass-panel p-6 text-center border-accent-primary/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-accent-primary"><Brain size={64} /></div>
            <h4 className="font-bold text-accent-primary mb-2 text-lg">{t('strategic_insight')}</h4>
            <p className="text-sm text-gray-300 leading-relaxed font-medium">
              {t('matchup_desc_example')}
            </p>
          </div>

          {/* Detailed Stats Comparison */}
          <div className="glass-panel p-6 flex-1 space-y-6">
            <MatchupStatRow label={t('lane_kill_rate')} val1={55} val2={45} color="green" />
            <MatchupStatRow label={t('gold_15')} val1={"+450g"} val2={"-450g"} color="yellow" textMode />
            <MatchupStatRow label={t('early_wr')} val1={58} val2={42} color="blue" />
            <MatchupStatRow label={t('late_wr')} val1={45} val2={55} color="red" />
            <MatchupStatRow label={t('first_tower')} val1={60} val2={40} color="orange" />
          </div>

          {/* Counter Items */}
          <div className="glass-panel p-4">
            <div className="text-xs font-bold text-gray-500 uppercase mb-3 text-center">{t('counter_items')}</div>
            <div className="flex justify-center gap-4">
              <img src="https://ddragon.leagueoflegends.com/cdn/16.1.1/img/item/3153.png" className="w-10 h-10 rounded border border-white/20" />
              <img src="https://ddragon.leagueoflegends.com/cdn/16.1.1/img/item/3075.png" className="w-10 h-10 rounded border border-white/20" />
              <img src="https://ddragon.leagueoflegends.com/cdn/16.1.1/img/item/3111.png" className="w-10 h-10 rounded border border-white/20" />
            </div>
          </div>
        </div>

        {/* Champ 2 */}
        <div className="col-span-4 glass-panel p-0 overflow-hidden relative group">
          <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ2}_0.jpg`} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="absolute bottom-6 right-6 text-right">
            <h3 className="text-5xl font-bold text-white tracking-tighter">{champ2}</h3>
            <div className="text-red-400 font-bold text-2xl mt-2 flex items-center justify-end gap-2">
              <span className="text-sm text-gray-400 font-normal uppercase">{t('winrate')}</span> 47.9%
            </div>
            <div className="flex gap-2 mt-4 justify-end">
              <div className="px-3 py-1 rounded bg-white/10 border border-white/10 text-xs font-bold text-white">Tier A</div>
              <div className="px-3 py-1 rounded bg-white/10 border border-white/10 text-xs font-bold text-white">Top</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MatchupStatRow({ label, val1, val2, color, textMode }) {
  const total = typeof val1 === 'number' ? val1 + val2 : 100;
  const p1 = typeof val1 === 'number' ? (val1 / total) * 100 : 50;
  const p2 = 100 - p1;

  return (
    <div>
      <div className="flex justify-between text-xs font-bold text-gray-400 mb-1">
        <span>{typeof val1 === 'number' ? val1 + '%' : val1}</span>
        <span className="uppercase text-[10px] tracking-wider">{label}</span>
        <span>{typeof val2 === 'number' ? val2 + '%' : val2}</span>
      </div>
      {!textMode && (
        <div className="flex h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <div style={{ width: `${p1}%` }} className={cn("h-full", color === 'green' ? 'bg-green-500' : color === 'blue' ? 'bg-blue-500' : color === 'red' ? 'bg-red-500' : 'bg-yellow-500')}></div>
          <div style={{ width: `${p2}%` }} className="h-full bg-gray-600"></div>
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
  const champs = championList?.length > 0 ? championList : ["Aatrox", "Ahri", "Zoom"]; // Fallback if empty, but should be populated

  const filtered = champs.filter(c => c.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-xl p-8 flex flex-col animate-in fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">{t ? t('select_champion') : 'Select Champion'}</h2>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full"><Power className="rotate-45" /></button>
      </div>
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          autoFocus
          type="text"
          placeholder={t ? t('search_champion') : 'Search...'}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 text-white font-bold outline-none focus:border-accent-primary transition-colors"
        />
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar grid grid-cols-8 gap-4 content-start">
        {filtered.map(c => (
          <div key={c} onClick={() => onSelect(c)} className="cursor-pointer group flex flex-col items-center gap-2">
            <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${c}_0.jpg`} className="w-16 h-16 rounded-xl border border-white/10 group-hover:border-accent-primary group-hover:scale-110 transition-all" />
            <span className="text-xs text-gray-400 group-hover:text-white font-medium truncate w-full text-center">{c}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function EsportsView({ t }) {
  const [activeChannel, setActiveChannel] = useState('riotgames');
  const [browserUrl, setBrowserUrl] = useState(null);

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

      <h2 className="text-3xl font-bold text-white flex items-center gap-3">
        <Trophy className="text-accent-primary" /> {t('esports_center')}
      </h2>
      <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
        <div className="col-span-8 flex flex-col gap-6 h-full">
          {/* Twitch Embed */}
          <div className="flex-1 bg-black rounded-2xl border border-white/10 overflow-hidden relative shadow-2xl group">
            <iframe
              src={`https://player.twitch.tv/?channel=${activeChannel}&parent=localhost`}
              className="w-full h-full"
              allowFullScreen
            ></iframe>

            {/* Overlay Controls */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="px-3 py-1 bg-black/80 hover:bg-black text-white text-xs font-bold rounded border border-white/10 backdrop-blur-md flex items-center gap-2" onClick={() => setActiveChannel('riotgames')}>
                <RefreshCw size={12} /> {t('switch_source')}
              </button>
            </div>

            <div className="absolute top-4 left-4 flex gap-2">
              <div className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded animate-pulse flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full"></span> LIVE
              </div>
              <div className="px-3 py-1 bg-black/60 text-white text-xs font-bold rounded border border-white/10 uppercase">{activeChannel}</div>
            </div>
          </div>

          {/* Channel Selector */}
          <div className="h-24 glass-panel p-2 flex items-center gap-4 overflow-x-auto custom-scrollbar">
            {channels.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveChannel(c.id)}
                className={cn(
                  "h-full min-w-[160px] rounded-xl flex flex-col justify-center px-4 border transition-all relative overflow-hidden group",
                  activeChannel === c.id ? "bg-white/10 border-accent-primary" : "bg-white/5 border-transparent hover:bg-white/10"
                )}
              >
                <div className="font-bold text-white text-sm relative z-10">{c.label}</div>
                <div className="text-xs text-gray-400 relative z-10 flex items-center gap-1"><Users size={10} /> {c.viewers}</div>
                {activeChannel === c.id && <div className="absolute inset-0 bg-accent-primary/10"></div>}
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar News & Schedule */}
        <div className="col-span-4 flex flex-col gap-4 h-full overflow-hidden">

          {/* Schedule */}
          <div className="glass-panel p-6 flex flex-col gap-4 max-h-[50%]">
            <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg border border-white/5">
              <h3 className="font-bold text-white text-lg">{t('upcoming_matches')}</h3>
              <Globe size={16} className="text-gray-500" />
            </div>

            <div className="overflow-y-auto space-y-3 pr-2 custom-scrollbar flex-1 min-h-0">
              <MatchScheduleItem
                team1="Gen.G" logo1={getTeamLogo('gen-g')}
                team2="DRX" logo2={getTeamLogo('drx')}
                time="17:00" date="Jan 15" league="LCK"
                url="https://lolesports.com/schedule?leagues=lck"
                onOpenUrl={setBrowserUrl}
              />
              <MatchScheduleItem
                team1="T1" logo1={getTeamLogo('t1')}
                team2="HLE" logo2={getTeamLogo('hanwha-life-esports')}
                time="17:00" date="Jan 16" league="LCK" highlight
                url="https://lolesports.com/schedule?leagues=lck"
                onOpenUrl={setBrowserUrl}
              />
              <MatchScheduleItem
                team1="DK" logo1={getTeamLogo('dplus-kia')}
                team2="KT" logo2={getTeamLogo('kt-rolster')}
                time="15:00" date="Jan 17" league="LCK"
                url="https://lolesports.com/schedule?leagues=lck"
                onOpenUrl={setBrowserUrl}
              />
              <MatchScheduleItem
                team1="G2" logo1={getTeamLogo('g2-esports')}
                team2="FNC" logo2={getTeamLogo('fnatic')}
                time="18:00" date="Jan 18" league="LEC"
                url="https://lolesports.com/schedule?leagues=lec"
                onOpenUrl={setBrowserUrl}
              />
              <MatchScheduleItem
                team1="TL" logo1={getTeamLogo('team-liquid')}
                team2="C9" logo2={getTeamLogo('cloud9')}
                time="21:00" date="Jan 24" league="LCS"
                url="https://lolesports.com/schedule?leagues=lcs"
                onOpenUrl={setBrowserUrl}
              />
            </div>
          </div>

          {/* News */}
          <div className="flex-1 glass-panel p-6 flex flex-col min-h-0">
            <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
              <Activity size={18} className="text-accent-primary" /> {t('latest_news')}
            </h3>
            <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
              <NewsItem
                img="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Azir_0.jpg"
                title="LCK Cup 2026 Kicks Off Jan 15"
                desc="T1, Gen.G, and HLE ready to battle in the new format."
                time="2 hours ago"
                url="https://lolesports.com/news"
                onOpenUrl={setBrowserUrl}
              />
              <NewsItem
                img="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ambessa_0.jpg"
                title="Patch 16.1 Notes: Ambessa Nerfs"
                desc="Riot addresses the dominance of the new top laner."
                time="5 hours ago"
                url="https://www.leagueoflegends.com/en-us/news/game-updates/"
                onOpenUrl={setBrowserUrl}
              />
              <NewsItem
                img="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_27.jpg"
                title="Faker: 'We are aiming for another trophy'"
                desc="The struggling legend speaks out before the season start."
                time="1 day ago"
                url="https://lolesports.com/news"
                onOpenUrl={setBrowserUrl}
              />
              <NewsItem
                img="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_40.jpg"
                title="Arcane Season 3 Announced?"
                desc="Rumors swirl about the next chapter of the saga."
                time="2 days ago"
                url="https://twitter.com/arcaneshow"
                onOpenUrl={setBrowserUrl}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BrowserOverlay({ url, onClose }) {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-black/95 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-6 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-4">
          <Globe size={18} className="text-accent-primary" />
          <div className="text-sm font-mono text-gray-400 max-w-lg truncate select-text">{url}</div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => {
            const el = document.querySelector('webview');
            if (el) el.reload();
          }} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
            <RefreshCw size={16} />
          </button>
          <button onClick={() => {
            const el = document.querySelector('webview');
            if (el && el.canGoBack()) el.goBack();
          }} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
            <ArrowRight className="rotate-180" size={16} />
          </button>
          <div className="h-6 w-px bg-white/10 mx-2"></div>
          <button onClick={onClose} className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-lg text-gray-400 transition-colors">
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
    <div onClick={() => onOpenUrl(url)} className={cn("group flex flex-col p-3 rounded-xl border transition-all hover:bg-white/5 relative overflow-hidden gap-2 cursor-pointer", highlight ? "bg-accent-primary/10 border-accent-primary/30" : "bg-black/20 border-white/5")}>
      {highlight && <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-primary"></div>}

      {/* Time & League Header */}
      <div className="flex justify-between items-center text-[10px] uppercase font-bold text-gray-500 border-b border-white/5 pb-2 mb-1">
        <div className="flex items-center gap-1">
          <span>{league}</span>
          <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-accent-primary" />
        </div>
        <span className="text-gray-400">{date} Ã¢â‚¬Â¢ {time}</span>
      </div>

      {/* Matchup Layout */}
      <div className="grid grid-cols-7 items-center gap-1">
        {/* Team 1 */}
        <div className="col-span-3 flex items-center justify-start gap-2 overflow-hidden">
          <img src={logo1} className="w-6 h-6 object-contain shrink-0" onError={(e) => e.target.src = "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/teams/logos/team_logo_default.png"} />
          <span className="font-bold text-sm text-gray-200 truncate">{team1}</span>
        </div>

        {/* VS */}
        <div className="col-span-1 text-center text-[9px] font-bold text-gray-600 bg-black/40 rounded py-0.5">VS</div>

        {/* Team 2 */}
        <div className="col-span-3 flex items-center justify-end gap-2 overflow-hidden">
          <span className="font-bold text-sm text-gray-200 truncate">{team2}</span>
          <img src={logo2} className="w-6 h-6 object-contain shrink-0" onError={(e) => e.target.src = "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/teams/logos/team_logo_default.png"} />
        </div>
      </div>
    </div>
  )
}

function NewsItem({ img, title, desc, time, url, onOpenUrl }) {
  return (
    <div onClick={() => onOpenUrl(url)} className="flex gap-4 p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-all group border border-transparent hover:border-white/5">
      <div className="relative shrink-0 overflow-hidden rounded-lg w-20 h-14">
        <img src={img} className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
      </div>
      <div className="flex flex-col justify-center min-w-0">
        <h4 className="font-bold text-white text-sm leading-tight group-hover:text-accent-primary transition-colors line-clamp-1">{title}</h4>
        <p className="text-[10px] text-gray-500 mt-1 line-clamp-1">{desc}</p>
        <div className="text-[9px] text-gray-600 mt-1 flex items-center gap-1">
          <Clock size={10} /> {time}
        </div>
      </div>
      <div className="self-center ml-auto opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
        <ExternalLink size={12} className="text-gray-500 group-hover:text-accent-primary" />
      </div>
    </div>
  )
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
        const processedSkins = rawSkins
          .filter(s => s.ownership && s.ownership.owned && !s.isBase)
          .map(s => {
            const championId = Math.floor(s.id / 1000);
            const skinIndex = s.id % 1000;
            // championList is now array of objects { key, id, name ... }
            const champ = (championList || []).find(c => parseInt(c.key) === championId);
            const champId = champ ? champ.id : null;
            const champName = champ ? champ.name : "Unknown";

            // Metadata Lookup
            const meta = skinMetadata[String(s.id)] || skinMetadata[s.id] || {};
            let rarity = meta.rarity ? meta.rarity.replace('k', '').toLowerCase() : 'common';
            if (rarity === 'norarity') rarity = 'common';

            // Cost calculation
            // Sometimes cost is "null" string or null or numeric
            let costVal = 0;
            if (meta.cost && meta.cost !== 'null') {
              costVal = parseInt(meta.cost) || 0;
            }

            const splashUrl = champId
              ? `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champId}_${skinIndex}.jpg`
              : `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${championId}/${s.id}.jpg`;

            const fullUrl = champId
              ? `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champId}_${skinIndex}.jpg`
              : splashUrl;


            return {
              id: s.id,
              name: s.name,
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
        <h2 className="text-4xl font-black text-white flex items-center gap-3 tracking-tighter uppercase">
          <LayoutGrid className="text-blue-500" size={32} /> {t('collections_title')}
        </h2>
        <p className="text-white/30 text-xs font-bold uppercase tracking-widest ml-11">Visualisez votre inventaire cosmÃƒÂ©tique</p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-xl">
          <button onClick={() => setActiveSubTab('skins')} className={cn("px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", activeSubTab === 'skins' ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-white/40 hover:text-white")}>Skins ({skins.length})</button>
          <button onClick={() => setActiveSubTab('wards')} className={cn("px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", activeSubTab === 'wards' ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-white/40 hover:text-white")}>Balises ({wards.length})</button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => { setSkins([]); setWards([]); fetchCollections(); }}
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all border border-white/10"
            title="Rafraichir"
          >
            <RefreshCw size={14} className={cn(loading && "animate-spin")} />
          </button>

          <div className="relative group">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Chercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-bold text-white outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all w-64 placeholder:text-white/10"
            />
          </div>
          <div className="relative group bg-white/5 border border-white/10 rounded-2xl flex items-center px-4 py-2.5 gap-2 hover:bg-white/10 transition-all cursor-pointer min-w-[140px]">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white/60 transition-colors">Trier</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-transparent text-[10px] font-black uppercase tracking-widest text-white outline-none cursor-pointer w-full absolute inset-0 opacity-0 z-10"
            >
              <option value="alpha_az" className="bg-[#1a1c22] text-white">Nom (A-Z)</option>
              <option value="alpha_za" className="bg-[#1a1c22] text-white">Nom (Z-A)</option>
            </select>
            <span className="text-[10px] font-black uppercase tracking-widest text-white pointer-events-none flex-1 text-right">
              {sortBy === 'alpha_az' ? 'A-Z' : 'Z-A'}
            </span>
            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px] border-t-white/40 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar no-drag">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <div className="text-sm font-black uppercase tracking-[0.3em] text-white/40">Synchronisation de l'inventaire...</div>
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
                      "group relative overflow-hidden transition-all cursor-pointer shadow-2xl duration-500 bg-[#0A0A0E] border box-border",
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
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedAsset(item)}
                    className="group relative aspect-[3/4] rounded-[24px] overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all cursor-pointer shadow-2xl hover:-translate-y-2 duration-500 bg-[#0A0A0E]"
                  >
                    <img
                      src={item.splash || item.image}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      onError={(e) => { e.target.src = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png'; }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

                    <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col gap-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="text-xs font-black text-white leading-tight line-clamp-2">{item.name}</div>
                      <div className="flex items-center justify-end w-full">
                        {item.rarity && (
                          <div className={cn(
                            "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg backdrop-blur-md border border-white/10 ring-1 ring-white/5",
                            rarityColors[item.rarity] || rarityColors.common
                          )}>
                            <div className="w-1.5 h-1.5 rotate-45 bg-white mix-blend-overlay shadow-[0_0_5px_currentColor]" />
                            {item.rarity === 'common' ? 'CLASSIQUE' : item.rarity}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-tr from-white/10 via-white/5 to-white/20 pointer-events-none" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {!loading && filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-white/20 gap-4">
            <Activity size={48} className="opacity-10 animate-pulse" />
            <div className="text-sm font-black uppercase tracking-[0.3em] text-center">
              Aucune collection trouvÃƒÂ©e <br />
              <span className="text-[10px] opacity-50 normal-case tracking-normal">VÃƒÂ©rifiez que le client League est ouvert et connectÃƒÂ©.</span>
            </div>
            <button
              onClick={() => { setLoading(true); setSkins([]); setWards([]); fetchCollections(); }}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold uppercase tracking-widest transition-all"
            >
              RÃƒÂ©essayer
            </button>
          </div>
        )}
      </div>

      {/* ASSET PREVIEW MODAL */}
      {selectedAsset && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-12 animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-3xl"
            onClick={() => setSelectedAsset(null)}
          />
          <div className={cn(
            "relative w-full rounded-[40px] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(30,58,138,0.5)] group",
            selectedAsset.type === 'ward' ? "max-w-xl aspect-square bg-black/50" : "max-w-6xl aspect-video"
          )}>
            <img
              src={selectedAsset.full || selectedAsset.image}
              className={cn(
                "w-full h-full animate-in zoom-in-95 duration-700",
                selectedAsset.type === 'ward' ? "object-contain p-12" : "object-cover"
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="absolute bottom-0 inset-x-0 p-12 flex items-end justify-between">
              <div>
                <h3 className="text-5xl font-black text-white tracking-tighter mb-2">{selectedAsset.name}</h3>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-white/40 uppercase tracking-widest">{selectedAsset.champion || "Objet de collection"}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedAsset(null)}
                className="bg-white/10 hover:bg-white text-white hover:text-black w-14 h-14 rounded-full flex items-center justify-center transition-all active:scale-95 border border-white/20"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RankingsView({ panelClass, t, setTargetSummoner, setActiveTab, ddragonVersion }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [queue, setQueue] = useState('RANKED_SOLO_5x5');
  const [region, setRegion] = useState('EUW'); // Visual only for now as LCU is region locked
  const [filterRole, setFilterRole] = useState('ALL');
  const [top3Details, setTop3Details] = useState([]);

  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [dataSource, setDataSource] = useState('LOADING'); // LCU, LIVE, OFFLINE

  useEffect(() => {
    let interval;

    const FALLBACK_GLOBAL_DATA = [
      { summonerName: "GEN Chovy", leaguePoints: 2058, wins: 155, losses: 98, iconId: 7, region: 'KR' },
      { summonerName: "T1 Faker", leaguePoints: 1950, wins: 312, losses: 275, iconId: 6, region: 'KR' },
      { summonerName: "BLG Knight", leaguePoints: 1890, wins: 220, losses: 185, iconId: 10, region: 'CH' },
      { summonerName: "HLE Viper", leaguePoints: 1855, wins: 208, losses: 165, iconId: 21, region: 'KR' },
      { summonerName: "G2 Caps", leaguePoints: 1790, wins: 340, losses: 308, iconId: 29, region: 'EUW' },
      { summonerName: "JDG Ruler", leaguePoints: 1750, wins: 160, losses: 115, iconId: 11, region: 'KR' },
      { summonerName: "KT Bdd", leaguePoints: 1720, wins: 290, losses: 260, iconId: 20, region: 'KR' },
      { summonerName: "DK ShowMaker", leaguePoints: 1680, wins: 285, losses: 245, iconId: 20, region: 'KR' },
      { summonerName: "T1 Keria", leaguePoints: 1650, wins: 300, losses: 270, iconId: 22, region: 'KR' },
      { summonerName: "G2 Mikyx", leaguePoints: 1610, wins: 320, losses: 300, iconId: 1, region: 'EUW' },
      { summonerName: "C9 Blaber", leaguePoints: 1550, wins: 250, losses: 240, iconId: 25, region: 'NA' },
      { summonerName: "FNC Humanoid", leaguePoints: 1520, wins: 240, losses: 230, iconId: 26, region: 'EUW' },
      { summonerName: "TL Impact", leaguePoints: 1500, wins: 230, losses: 225, iconId: 24, region: 'NA' },
      { summonerName: "WBG TheShy", leaguePoints: 1480, wins: 210, losses: 205, iconId: 27, region: 'CH' },
      { summonerName: "KC Caliste", leaguePoints: 1450, wins: 260, losses: 190, iconId: 1, region: 'EUW' }
    ].map(p => ({ ...p, summonerId: p.summonerName }));

    const loadLadder = async () => {
      // Don't set loading on background refreshes if we already have data
      if (data.length === 0) setLoading(true);

      try {
        // 1. Try Local LCU
        const league = await ipcRenderer.invoke('lcu:get-challenger-league', queue);

        if (league && league.entries && league.entries.length > 0) {
          // Real Local Data Found
          const sorted = league.entries.sort((a, b) => b.leaguePoints - a.leaguePoints);
          setData(sorted);
          setRegion('EUW');
          setDataSource('LCU (Local)');
          setLastUpdated(new Date());

          // Fetch details for top 3
          const top3 = sorted.slice(0, 3);
          const details = await Promise.all(top3.map(async (p) => {
            try {
              const sum = await ipcRenderer.invoke('lcu:search-summoner', p.summonerName);
              return { ...p, iconId: sum?.profileIconId || 29 };
            } catch (err) {
              return { ...p, iconId: 29 };
            }
          }));
          setTop3Details(details);

        } else {
          // 2. FALLBACK: Global Scraper
          if (data.length === 0) console.log("No local data found, fetching Global Ladder...");

          let globalData = [];
          try {
            globalData = await ipcRenderer.invoke('scraper:get-global-ladder');
          } catch (err) { console.error("Scraper failed", err); }

          if (globalData && globalData.length > 0) {
            setRegion('GLOBAL');
            setData(globalData);
            setTop3Details(globalData.slice(0, 3));
            setDataSource('LIVE (Web)');
            setLastUpdated(new Date());
          } else {
            // 3. LAST RESORT: Static Snapshot (so user never sees empty screen)
            console.log("Global scraper returned no data. Using Static Snapshot.");
            setRegion('OFFLINE');
            setData(FALLBACK_GLOBAL_DATA);
            setTop3Details(FALLBACK_GLOBAL_DATA.slice(0, 3));
            setDataSource('OFFLINE CACHE');
            setLastUpdated(new Date());
          }
        }
      } catch (e) {
        console.error("Ladder catch error", e);
        // Retry with Fallback directly
        setRegion('OFFLINE');
        setData(FALLBACK_GLOBAL_DATA);
        setTop3Details(FALLBACK_GLOBAL_DATA.slice(0, 3));
        setDataSource('OFFLINE ERROR');
        setLastUpdated(new Date());
      } finally {
        setLoading(false);
      }
    };

    window.refreshLadder = loadLadder; // Expose for button
    loadLadder();

    // Auto-Refresh every 5 minutes
    interval = setInterval(loadLadder, 300000);

    return () => clearInterval(interval);
  }, [queue]);

  const goToProfile = (name, reg) => {
    if (setTargetSummoner && setActiveTab) {
      setTargetSummoner({ name, region: reg || region });
      setActiveTab('profile');
    }
  };

  const top3 = top3Details.length > 0 ? top3Details : data.slice(0, 3);
  const rest = data.slice(3, 100); // Limit to top 100 for perf

  return (
    <div className="h-full flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-4 pb-4">
      {/* Header & Filters */}
      <div className={cn("p-4 rounded-[24px] flex items-center justify-between shrink-0", panelClass)}>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-accent-primary/10 rounded-xl text-accent-primary">
            <Trophy size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight uppercase">Classement Challenger</h2>
            <div className="flex items-center gap-2 text-xs text-gray-500 font-bold uppercase tracking-widest">
              <span>{queue === 'RANKED_SOLO_5x5' ? 'Solo/Duo' : 'Flex 5v5'} Ã¢â‚¬Â¢ {region}</span>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <span className={cn(dataSource.includes('OFFLINE') ? "text-red-400" : "text-green-400")}>{dataSource}</span>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <span>{lastUpdated.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Refresh Button */}
          <button
            onClick={() => { setLoading(true); window.refreshLadder?.(); }}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-colors"
            title="Actualiser"
          >
            <RefreshCw size={20} className={cn(loading && "animate-spin")} />
          </button>
          {/* Roles Filter */}
          <div className="flex bg-black/20 p-1 rounded-xl border border-white/5">
            {['ALL', 'TOP', 'JUNGLE', 'MIDDLE', 'BOTTOM', 'SUPPORT'].map((r) => {
              const iconMap = {
                'ALL': 'fill-current',
                'TOP': 'position-top',
                'JUNGLE': 'position-jungle',
                'MIDDLE': 'position-middle',
                'BOTTOM': 'position-bottom',
                'SUPPORT': 'position-utility'
              };
              const isAll = r === 'ALL';
              return (
                <button
                  key={r}
                  onClick={() => setFilterRole(r)}
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                    filterRole === r ? "bg-accent-primary text-black shadow-lg shadow-accent-primary/20" : "text-gray-500 hover:text-white"
                  )}
                >
                  {isAll ? <List size={16} /> : (
                    <img src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/${iconMap[r]}.svg`} className={cn("w-4 h-4", filterRole === r ? "brightness-0 invert" : "grayscale opacity-50")} />
                  )}
                </button>
              )
            })}
          </div>

          <div className="w-px h-8 bg-white/10"></div>

          {/* Queue Toggle */}
          <div className="flex bg-black/20 p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setQueue('RANKED_SOLO_5x5')}
              className={cn("px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all", queue === 'RANKED_SOLO_5x5' ? "bg-white text-black" : "text-gray-500 hover:text-white")}
            >
              Solo
            </button>
            <button
              onClick={() => setQueue('RANKED_FLEX_SR')}
              className={cn("px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all", queue === 'RANKED_FLEX_SR' ? "bg-white text-black" : "text-gray-500 hover:text-white")}
            >
              Flex
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <RefreshCw className="animate-spin text-accent-primary" size={48} />
          <div className="text-gray-500 font-bold uppercase tracking-widest text-xs">Chargement du classement...</div>
        </div>
      ) : (
        <>
          {/* Top 3 Podium */}
          <div className="grid grid-cols-3 gap-3 shrink-0">
            {top3.map((p, i) => {
              const rank = i + 1;
              const totalGames = p.wins + p.losses;
              const wr = Math.round((p.wins / totalGames) * 100);
              const colors = ["text-yellow-400 border-yellow-400/20 bg-yellow-400/5", "text-gray-300 border-gray-300/20 bg-gray-300/5", "text-amber-600 border-amber-600/20 bg-amber-600/5"];
              const colorClass = colors[i] || colors[1];

              return (
                <div key={p.summonerId}
                  onClick={() => goToProfile(p.summonerName, p.region)}
                  className={cn("rounded-[24px] p-4 border flex flex-col gap-3 relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-all", panelClass, colorClass.split(' ')[1])}>
                  {/* Rank Number Big */}
                  <div className="absolute top-2 left-4 text-5xl font-black opacity-10 italic select-none">{rank}</div>

                  <div className="relative z-10 flex items-center justify-between">
                    <div className={cn("text-3xl font-black italic", colorClass.split(' ')[0])}>{rank}</div>
                    <span className="px-2 py-0.5 rounded text-[9px] font-black bg-black/40 text-gray-400 border border-white/10 uppercase">{p.region || region}</span>
                  </div>

                  <div className="relative z-10 flex items-center gap-3 mt-1">
                    <img src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion || '15.1.1'}/img/profileicon/${p.iconId || 29}.png`} className="w-12 h-12 rounded-xl border-2 border-white/10 shadow-lg" />
                    <div>
                      <div className="text-xl font-bold text-white truncate max-w-[150px]">{p.summonerName}</div>
                      <div className="text-xs text-gray-500 font-mono">Challenger</div>
                    </div>
                  </div>

                  <div className="relative z-10 mt-1 text-center">
                    <div className={cn("text-3xl font-black tracking-tighter", colorClass.split(' ')[0])}>{p.leaguePoints} LP</div>
                    <div className="text-xs font-bold text-gray-400 mt-1">{p.wins}W - {p.losses}L ({wr}%)</div>
                  </div>

                  {/* Compact Footer */}
                  <div className="flex justify-between items-center mt-auto pt-2 border-t border-white/5">
                    <div className="flex flex-col">
                      <span className="text-[8px] text-gray-500 uppercase tracking-widest">Parties</span>
                      <span className="text-sm font-bold text-white">{totalGames}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[8px] text-gray-500 uppercase tracking-widest">KDA</span>
                      <span className="text-sm font-bold text-white">{(Math.random() * 1 + 3.0).toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              )
            })}
            {[...Array(3 - top3.length)].map((_, i) => <div key={i} className="rounded-[32px] bg-white/5 border border-white/5 animate-pulse" />)}
          </div>

          {/* List Table */}
          <div className={cn("flex-1 overflow-hidden flex flex-col rounded-[32px] border border-white/5", panelClass)}>
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-black/20">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-3">Joueur</div>
              <div className="col-span-2 text-center">RÃƒÂ´le</div>
              <div className="col-span-2 text-right">LP</div>
              <div className="col-span-2 text-center">Winrate</div>
              <div className="col-span-2 text-center">KDA</div>
            </div>

            {/* Rows */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
              {rest.map((p, i) => {
                const rank = i + 4;
                const wr = Math.round((p.wins / (p.wins + p.losses)) * 100);
                const roles = ['TOP', 'JUNGLE', 'MIDDLE', 'BOTTOM', 'SUPPORT'];
                // Fake role assignment based on hash of name
                const role = roles[(p.summonerName.charCodeAt(0) % 5)];
                const roleIcon = `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-${role === 'SUPPORT' ? 'utility' : role.toLowerCase()
                  }.svg`;

                if (filterRole !== 'ALL' && role !== filterRole) return null;

                return (
                  <div key={`${p.summonerName}-${rank}`}
                    onClick={() => goToProfile(p.summonerName, p.region)}
                    className="grid grid-cols-12 gap-4 p-2 rounded-lg hover:bg-white/5 items-center transition-colors group cursor-pointer">
                    <div className="col-span-1 text-center font-black text-gray-400 italic text-lg">{rank}</div>

                    <div className="col-span-3 flex items-center gap-3">
                      <div className="relative">
                        <img src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion || '15.1.1'}/img/profileicon/${p.iconId || (Math.floor(p.summonerName.charCodeAt(0) % 28) + 1)}.png`} className="w-8 h-8 rounded-lg border border-white/10" />
                        <div className="absolute -bottom-1 -right-1 bg-[#1e1e24] text-[8px] font-bold text-white px-1 rounded shadow border border-white/10">{p.region || region}</div>
                      </div>
                      <div className="truncate font-bold text-white text-sm">{p.summonerName}</div>
                    </div>

                    <div className="col-span-2 flex justify-center">
                      <img src={roleIcon} className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity invert brightness-0" />
                    </div>

                    <div className="col-span-2 text-right font-black text-accent-primary italic tracking-tight">{p.leaguePoints} LP</div>

                    <div className="col-span-2 flex flex-col items-center justify-center gap-1">
                      <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full", wr >= 50 ? "bg-blue-500" : "bg-red-500")} style={{ width: `${wr}%` }}></div>
                      </div>
                      <div className="text-[9px] font-bold text-gray-400">{p.wins}W - {p.losses}L ({wr}%)</div>
                    </div>

                    <div className="col-span-2 text-center font-bold text-gray-500">{(Math.random() * 2 + 2.0).toFixed(1)}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
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
          <div className="font-bold text-white group-hover:text-accent-primary transition-colors">{label}</div>
          <div className="text-[10px] text-gray-500 font-medium leading-tight max-w-[150px]">{desc}</div>
        </div>
      </div>
      <div
        onClick={onToggle}
        className={cn("w-11 h-6 rounded-full relative cursor-pointer transition-all duration-300", active ? "bg-accent-primary shadow-[0_0_10px_rgba(6,182,212,0.4)]" : "bg-gray-800")}
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
              <div className="relative w-10 h-10 overflow-hidden rounded-lg border border-white/20">
                <img src={iconUrl} className="w-full h-full object-cover scale-110" />
                <div className="absolute bottom-0 right-0 bg-black/80 text-[8px] font-black px-1 rounded-tl-md border-t border-l border-white/20 text-blue-400">
                  {bestKey}
                </div>
              </div>
            ) : <Brain size={14} />,
            title: `Niveau ${level} • ${skillOrder ? 'LIVE DATA' : 'AI SUGGEST'}`,
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

  // Add visibility debugging if needed
  if (isTest && !gameData) {
    // Ensure we still render in test mode even without LCU data
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none select-none z-[9999]"
      style={{ display: 'block' }} // Ensure it's not hidden by some weird CSS state
    >
      {/* Win% Widget (ALT+O) */}
      {(showWinrate || isTest) && (
        <div
          style={{ left: `${pos?.winrate?.x ?? 40}%`, top: `${pos?.winrate?.y ?? 5}%` }}
          className="absolute px-6 py-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-4 animate-in slide-in-from-top-4"
        >
          <div className="flex items-center gap-2">
            <div className="text-[10px] font-black text-blue-400 uppercase">{t('blue_team')}</div>
            <div className="text-xl font-black text-white">52%</div>
          </div>
          <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden flex">
            <div className="h-full bg-blue-500" style={{ width: '52%' }}></div>
            <div className="h-full bg-red-500" style={{ width: '48%' }}></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xl font-black text-white">48%</div>
            <div className="text-[10px] font-black text-red-400 uppercase">{t('red_team')}</div>
          </div>
        </div>
      )}

      {/* Jungle Clear Helper / Pathing */}
      {(isJungle && (overlaySettings.junglePathing || overlaySettings.jungleTimers)) && (
        <div
          style={{ left: `${pos?.jungle?.x ?? 2}%`, top: `${pos?.jungle?.y ?? 40}%` }}
          className="absolute bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/5 animate-in slide-in-from-left-4"
        >
          <div className="text-[9px] font-black text-accent-primary uppercase mb-2">{t('jungle_insight')}</div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-800 border border-white/10 flex items-center justify-center">
              <Activity size={20} className="text-accent-primary" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">{t('logic_pathing')}</div>
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
            className="bg-black/80 backdrop-blur-xl border border-white/10 p-3 rounded-2xl flex items-start gap-3 animate-in slide-in-from-right-4 hover:bg-white/5 cursor-pointer transition-all active:scale-95 group shadow-2xl"
          >
            <div className={cn("p-2 rounded-xl",
              n.type === 'info' ? "bg-blue-500/10 text-blue-400" :
                n.type === 'warning' ? "bg-orange-500/10 text-orange-400" :
                  "bg-green-500/10 text-green-400"
            )}>
              {n.icon}
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-black text-white/50 uppercase tracking-widest flex items-center justify-between">
                {n.title}
                <X size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-xs font-bold text-white mb-2">{n.desc}</div>
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
    <div className="fixed inset-0 bg-black/95 z-[9999] p-12 flex flex-col items-center justify-center gap-12 animate-in fade-in">
      <div className="text-center">
        <h1 className="text-5xl font-black text-white tracking-widest italic mb-2">ORACLE <span className="text-accent-primary">VISION</span></h1>
        <div className="text-gray-500 font-bold uppercase tracking-[0.2em] text-sm">Chargement de la Faille...</div>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-2 gap-24">
        <div className="space-y-4">
          <div className="h-px bg-gradient-to-r from-blue-500 to-transparent opacity-50"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 bg-blue-500/5 p-3 rounded-xl border border-blue-500/10">
              <div className="w-12 h-12 bg-gray-800 rounded border border-white/10"></div>
              <div className="flex-1">
                <div className="font-bold text-white">Joueur Bleu {i + 1}</div>
                <div className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Platine II Ã¢â‚¬Â¢ 58% WR</div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="h-px bg-gradient-to-l from-red-500 to-transparent opacity-50 text-right"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 bg-red-500/5 p-3 rounded-xl border border-red-500/10 flex-row-reverse text-right">
              <div className="w-12 h-12 bg-gray-800 rounded border border-white/10"></div>
              <div className="flex-1">
                <div className="font-bold text-white">Joueur Rouge {i + 1}</div>
                <div className="text-[10px] text-red-400 font-bold uppercase tracking-widest">Emeraude IV Ã¢â‚¬Â¢ 42% WR</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-gray-400 font-medium text-sm animate-pulse italic">Appuyez sur [ALT+O] en jeu pour activer l'analyse prÃƒÂ©dictive</div>
    </div>
  )
}



export default App;

