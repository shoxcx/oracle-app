import React, { useState } from 'react';
import { 
  BookOpen, Map, Users, Target, Search, Play, Video, Shield, Zap, Info, 
  ArrowRight, PlayCircle, MonitorPlay, Activity, Crosshair, MapPin, Eye, 
  Flag, ShieldAlert, Navigation, Coins, ChevronLeft, Lightbulb, X, 
  Skull, Flame, Droplets, Wind, Mountain, Swords, TrendingUp, Anchor,
  Heart, Hexagon, Cross, Clock, Star, ZapOff, ArrowUpCircle, Sparkles, Crown, Hammer, Bug
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) { return twMerge(clsx(inputs)); }

const CATEGORIES = [
  { id: 'basics', label: 'Bases & Économie', icon: <BookOpen size={16} />, color: 'from-blue-500 to-indigo-600' },
  { id: 'objectives', label: 'Objectifs & Carte', icon: <Map size={16} />, color: 'from-emerald-500 to-teal-600' },
  { id: 'mechanics', label: 'Mécaniques & Macro', icon: <Swords size={16} />, color: 'from-amber-500 to-orange-600' },
  { id: 'roles', label: 'Rôles & Statistiques', icon: <Users size={16} />, color: 'from-purple-500 to-pink-600' },
  { id: 'equipment', label: 'Spécial : Objets & Sorts', icon: <Sparkles size={16} />, color: 'from-rose-500 to-red-600' }
];

const TUTORIAL_CONTENT = {
  basics: [
    {
      id: 'cs',
      title: "Farm & CS (Creep Score)", 
      type: "icon",
      icon: <Coins className="text-yellow-400" size={36}/>,
      background: "from-yellow-500/20 to-orange-500/5",
      desc: "L'art de donner le coup de grâce aux sbires pour obtenir de l'or. La source de revenus principale du jeu.",
      tags: ["Or", "Phase de Lane"],
      details: [
        { type: "p", text: "Le terme CS représente le nombre total de sbires et monstres neutres que vous avez achevés (Last Hit). L'essentiel de votre or provient de cette action, plus que des éliminations ! " },
        { type: "p", text: "Tuer environ 15 sbires rapporte autant d'or qu'un kill sur un champion adverse (300 pièces d'or). Un bon farm garantit que vous aurez plus d'objets que vos adversaires." },
        { type: "tip", text: "Visez 7 à 9 CS par minute en moyenne. Entraînez-vous dans l'Outil d'entraînement à porter le coup final au dernier moment possible (quand la barre de vie du sbire est minuscule)." }
      ]
    },
    {
      id: 'kda',
      title: "KDA & Impact", 
      type: "icon",
      icon: <Cross className="text-red-400" size={36}/>,
      background: "from-red-500/20 to-rose-500/5",
      desc: "Ratio d'éliminations, assistances et morts. Un mauvais KDA ne signifie pas toujours une mauvaise partie.",
      tags: ["Statistiques", "Score"],
      details: [
        { type: "p", text: "Le KDA se calcule : (Kills + Assists) / Deaths. Si vous avez 5 kills, 5 assists et 2 morts, votre KDA est de 5.0." },
        { type: "p", text: "League of Legends est un jeu de destruction d'objectifs, pas de match à mort. Un joueur avec peu de kills mais qui détruit 4 tours aura souvent plus d'impact sur la victoire qu'un assassin avec 20 kills qui ne frappe jamais les tours." },
        { type: "tip", text: "Évitez de mourir inutilement. Chaque mort donne 300 Or à l'adversaire ET lui permet de farmer gratuitement sur la carte. Ne poursuivez pas un ennemi bas en vie dans sa propre jungle aveuglément." }
      ]
    },
    {
      id: 'xp',
      title: "L'Expérience (XP) & Niveaux", 
      type: "icon",
      icon: <ArrowUpCircle className="text-emerald-400" size={36}/>,
      background: "from-emerald-500/20 to-green-500/5",
      desc: "Gagner des niveaux augmente vos statistiques de base exponentiellement par rapport à l'Or.",
      tags: ["Ressources", "Puissance"],
      details: [
        { type: "p", text: "Rester à proximité des sbires ennemis lorsqu'ils meurent (même sans les tuer soi-même) octroie de l'XP. Obtenir un niveau d'avance sur votre adversaire de ligne équivaut à plus de 500 Pièces d'or en statistiques bonus (Vie, Dégâts, Armure) !" },
        { type: "p", text: "C'est pourquoi être forcé à rentrer à la base (Recall) et rater une vague entière de sbires écrasée sous votre tour est punitif : vous perdez de l'Or, mais surtout de l'Expérience." },
        { type: "tip", text: "Le cap du niveau 2 est crucial ! Sur la To/Midlane, il s'obtient après 1 vague entière + 1 sbire de la mêlée. Sur la Botlane (à deux), il s'obtient après 1 vague + 3 sbires de la mêlée. Engager un combat au niveau 2 contre des ennemis de niveau 1 est la méthode la plus classique pour obtenir le Premier Sang (First Blood)." }
      ]
    },
    {
      id: 'scaling',
      title: "Le Scaling", 
      type: "icon",
      icon: <TrendingUp className="text-purple-400" size={36}/>,
      background: "from-purple-500/20 to-fuchsia-500/5",
      desc: "La capacité d'un champion à devenir de plus en plus surpuissant à mesure que la partie avance en durée (Late Game).",
      tags: ["Concept", "Late Game"],
      details: [
        { type: "p", text: "Certains champions (comme Lee Sin, Panthéon, ou Renekton) sont extrêmement forts en début de partie (Early Game). On dit qu'ils tombent (Fall off) par la suite." },
        { type: "p", text: "D'autres (comme Kayle, Kassadin, ou Vayne) sont faibles au début, mais deviennent des monstres inarrêtables avec 4 ou 5 objets. Ils ont un excellent 'Scaling'." },
        { type: "tip", text: "Si votre équipe possède 3 champions qui 'Scale' (ex: Viktor Mid, Jinx ADC, Ornn Top), ne tentez rien de risqué en début de partie (pas de combats épiques pour un simple Dragon). Contentez-vous de défendre vos tours et de farmer. Après 30 minutes, votre victoire est mathématiquement quasiment assurée." }
      ]
    }
  ],
  objectives: [
    {
      id: 'baron',
      title: "Baron Nashor",
      type: "icon",
      icon: <Skull className="text-fuchsia-500" size={36}/>,
      background: "from-fuchsia-900/50 to-purple-900/30",
      desc: "L'objectif ultime, la créature de la rivière Haute. Son buff est la clé pour terminer une partie en détruisant la base ennemie.",
      tags: ["Épique", "Fin de partie"],
      details: [
        { type: "p", text: "A partir de 20:00, le Baron remplace le Héraut. C'est le boss le plus meurtrier de la Faille. Tuer le Baron Nashor confère la 'Main du Baron' à tous les membres en vie de l'équipe." },
        { type: "p", text: "Ce buff réduit drastiquement le temps de retour à la base (Recall 4 secondes) et insuffle une aura qui renforce massivement tous les sbires alliés à proximité (ils deviennent plus gros, tapent plus fort et résistent aux tours)." },
        { type: "tip", text: "Un buff Baron dure 3 minutes. Le gâcher en farmant sa propre jungle est une erreur de débutant gravissime. Dispersez-vous sur les 3 voies idéalement (1-3-1) pour enfoncer simultanément toutes les tourelles de ligne adverse !" }
      ]
    },
    {
      id: 'dragons',
      title: "Dragons Élémentaires & Âme",
      type: "icon",
      icon: <Flame className="text-orange-500" size={36}/>,
      background: "from-orange-900/50 to-red-900/30",
      desc: "Chaque Drake offre un bonus passif aux statistiques. La première équipe à en accumuler 4 obtient l'Âme.",
      tags: ["Neutral", "Buff Permanent"],
      details: [
        { type: "p", text: "Infernal (Augmente AD/AP), Océan (Régénération PV perdus), Montagne (Bonus Armure/Résistance magique), Nuage (Vitesse de déplacement et résist. ralentissements), Hextech (Vitesse d'attaque), Chimtech (Ténacité)." },
        { type: "p", text: "Sécuriser l'Âme (4ème Dragon pour la même équipe) cimente souvent la victoire de cette équipe, car le pouvoir supplémentaire est monumental." },
        { type: "tip", text: "La Fosse du Dragon (Botlane) est le théâtre n°1 des premiers combats du jeu. Votre Jungler ne pourra jamais abattre un Dragon tout seul sans l'aide (Priorité) du Mid et de la Botlane. Ne l'y forcez pas s'ils n'ont pas repoussé leurs lignes d'abord." }
      ]
    },
    {
      id: 'elder',
      title: "Dragon Ancestral (Elder)",
      type: "icon",
      icon: <Crown className="text-teal-400" size={36}/>,
      background: "from-teal-900/50 to-blue-900/30",
      desc: "Objectif unique qui naît seulement APRES l'obtention d'une Âme du Dragon. Son buff garantit l'exécution des ennemis.",
      tags: ["Ultime", "Exécution"],
      details: [
        { type: "p", text: "Une flamme ardente accompagne ce buff. Non seulement vos coups brûlent, mais dès que les PV d'un ennemi descendent sous les 20%, un souffle divin s'abat sur lui et l'exécute instantanément en ignorant la plupart des boucliers." },
        { type: "tip", text: "Si l'adversaire obtient l'Ancestral, battez tous en retraite totale. Défendez depuis les lignes arrières de vos tours et laissez les 2 minutes 30 du buff expirer." }
      ]
    },
    {
      id: 'herald',
      title: "Héraut de la Faille",
      type: "icon",
      icon: <Hammer className="text-indigo-400" size={36}/>,
      background: "from-indigo-900/50 to-violet-900/30",
      desc: "Bête redoutable du début de partie. On le ramasse après l'avoir tué pour l'invoquer en tant que machine de siège.",
      tags: ["Siège", "20 Min"],
      details: [
        { type: "p", text: "Une fois invoqué sur une voie, le Héraut s'apprête à charger tête baissée contre la tourelle la plus proche, lui retirant environ 2500 à 3000 PV d'un coup. Idéal pour récupérer les 'Plaques' (Plates) de tour avant 14:00." },
        { type: "p", text: "Depuis la nouvelle saison, vous pouvez 'monter' sur le Héraut juste avant sa charge en cliquant sur lui et le diriger ! Frapper la tour ou les ennemis tout en le contrôlant double la distance du crash." },
        { type: "tip", text: "Son point faible est l'œil géant situé dans son dos. Frappez-le lorsqu'il s'ouvre pour le tuer à vitesse grand V." }
      ]
    },
    {
      id: 'grubs',
      title: "Larves du Néant (Grubs)",
      type: "icon",
      icon: <Bug className="text-purple-300" size={36}/>,
      background: "from-purple-900/50 to-fuchsia-900/30",
      desc: "Apparaissent dans la fosse haute très tôt dans le jeu. Tuer les 6 larves donne une capacité ravageuse contre les structures.",
      tags: ["Early Game", "Structures"],
      details: [
        { type: "p", text: "Les Larves apparaissent au début, avant le Héraut. Tuer des larves donne à l'équipe un buff permanent empilable de dégâts d'usure sur toutes les tours ennemies." },
        { type: "p", text: "Si votre équipe parvient à sécuriser 5 ou 6 Larves, frapper une tour continuera non seulement de la brûler, mais invoquera de petits sbires du néant pour gratter la tour ! Un Split pusher avec les 6 larves détruit une tour en quelques misérables secondes." },
        { type: "tip", text: "Le Jungler doit absolument chercher à voler au minimum 2 Larves au camp adverse afin d'empêcher l'équipe d'arriver au chiffre catastrophique des 5 Larves." }
      ]
    },
    {
      id: 'scuttle',
      title: "Carapateur (Scuttle Crab)",
      type: "icon",
      icon: <Eye className="text-cyan-400" size={36}/>,
      background: "from-cyan-900/50 to-blue-900/30",
      desc: "Le monstre lâche, qui ne riposte pas. Crucial pour garantir la vision sur les objectifs majeurs.",
      tags: ["Rivière", "Vision"],
      details: [
        { type: "p", text: "Se déplace constamment dans les rivières. A sa mort, il place un sanctuaire inamovible devant l'antre du Dragon (ou du Nashor) offrant la vision parfaite de la zone sans qu'elle puisse être détruite." },
        { type: "p", text: "Il donne aussi une forte dose d'Or et d'expérience et rend la vie agréable aux joueurs passant sur le sanctuaire (boost de vitesse de déplacement dans la rivière)." },
        { type: "tip", text: "Le Carapateur perd son énorme bouclier si vous lui appliquez un contrôle magique strict (Stun, Paralysie). Toujours le bloquer pour l'abattre immédiatement en 2 coups." }
      ]
    }
  ],
  mechanics: [
    {
      id: 'kiting',
      title: "Kite / Orbwalking", 
      type: "icon",
      icon: <Crosshair className="text-red-400" size={36}/>,
      background: "from-red-500/20 to-orange-500/5",
      desc: "L'art d'attaquer tout en se déplaçant entre chaque animation pour échapper aux ennemis ou les poursuivre sans interruption.",
      tags: ["Micro", "Tireur"],
      details: [
        { type: "p", text: "La mécanique reine de League of Legends. Plutôt que de rester fixe sur place lors d'un affrontement, vous attaquez la cible, et pendant le léger temps mort (~1 seconde ou moins) où la prochaine attaque se recharge, vous cliquez sur le sol pour vous déplacer, puis ré-attaquez." },
        { type: "p", text: "Cela vous maintient insaisissable contre les champions de mêlée comme Garen ou Udyr. On appelle cela le Hit & Run." },
        { type: "tip", text: "Configurez l'Option 'Q' (Attaque-Déplacement du Joueur) dans les paramètres du jeu. En utilisant la touche Q suivie d'un Clic, le jeu ciblera automatiquement l'ennemi le plus proche, vous empêchant de ruiner l'action en cliquant à côté (et ainsi de courir dans les bras de l'ennemi)." }
      ]
    },
    {
      id: 'freeze',
      title: "Freeze, Push, Crash & Bounce", 
      type: "icon",
      icon: <Wind className="text-sky-400" size={36}/>,
      background: "from-sky-500/20 to-blue-500/5",
      desc: "La sainte Trinité fondamentale de la gestion des Vagues de Sbires (Wave Management). Le facteur différenciant les amateurs des pro.",
      tags: ["Macro", "Avancé"],
      details: [
        { type: "p", text: "FREEZE: Le but ultime de la dominance de Ligne. On équilibre miraculeusement la rencontre des sbires exactement devant notre tour (sans qu'elle les touche). Pour ça, la vague ennemie doit comporter 3 sbires pleins de plus que la nôtre. L'ennemi est pétrifié et obligé de s'étendre sur votre territoire pour récupérer l'Or, le livrant en pâture à votre Jungler." },
        { type: "p", text: "SLOW PUSH: Tuer lentement les sbires mages adverses (et laisser la nature faire le reste) pour que votre vague accumule 10-15 sbires en boule avant d'arriver à la tour ennemie. Vous garantit un abri monstrueux contre les assauts." },
        { type: "p", text: "CRASH: Pousser agressivement au maximum pour verrouiller tous les sbires sous la tour ennemie. C'est le signal de départ pour rentrer librement à la base (Recall) s'acheter de l'équipement !" },
        { type: "tip", text: "BOUNCE: Une fois votre grosse vague (Slow Push) bien écrasée (Crush) sous l'édifice ennemi, la ligne va mécaniquement 'bondir en arrière' (Bounce) et va se mettre à pousser lentement vers VOUS, ouvrant un chemin de Freeze de retour gratuit." }
      ]
    },
    {
      id: 'prio',
      title: "La Priorité de Lane (Prio)", 
      type: "icon",
      icon: <Clock className="text-amber-400" size={36}/>,
      background: "from-amber-500/20 to-orange-500/5",
      desc: "Le concept dictant qui domine l'avancée de sa ligne et qui a la permission légitime d'aller se balader.",
      tags: ["Macro", "Rotation"],
      details: [
        { type: "p", text: "Avoir la priorité absolue, c'est réussir à forcer la position des sbires contre la tour de l'ennemi. Puisque l'adversaire est retenu 'en otage' sous sa fondation à ramasser l'or, vous êtes libéré de toute préoccupation sur la carte." },
        { type: "p", text: "Le Jungler a BESOIN que vous ayez la Prio. Si vous êtes emprisonnés à la tour, c'est suicidaire pour le Jungler d'aller envahir l'adversaire : le champion ennemi face à vous rejoindra le conflit des secondes avant vous." },
        { type: "tip", text: "On dit alors qu'il est illégal (suicidaire) d'entamer le Dragon ou le Héraut si son équipe ne possède pas les Priorités Radiales alentours." }
      ]
    },
    {
      id: 'peel',
      title: "Peeling & Positioning", 
      type: "icon",
      icon: <Shield className="text-blue-400" size={36}/>,
      background: "from-blue-500/20 to-cyan-500/5",
      desc: "Sacrifier ses pulsions offensives pour préserver vos alliés de très grande valeur d'une mort certaine.",
      tags: ["Combat", "Teamfight"],
      details: [
        { type: "p", text: "Le terme vient de l'idée d'« éplucher » l'ennemi loin de la peau de votre Carry ADC ou Mage. Cela signifie qu'au lieu de chercher avec Janna ou Maokai à tuer le tireur adverse, on bloque scrupuleusement le Zed ennemi sur le flanc pour qu'il ne détruise pas votre tireur." },
        { type: "tip", text: "La Backline (les tireurs derrière l'équipe) ne gagneront que si la Frontline (Tanks devant l'équipe) effectue le Peel sur l'Assassin ou le Combattant ennemi !" }
      ]
    },
    {
      id: 'trading',
      title: "Trading Stance (La Posture)", 
      type: "icon",
      icon: <Swords className="text-red-400" size={36}/>,
      background: "from-red-500/20 to-rose-500/5",
      desc: "Se placer de façon agressive quand votre adversaire commet la faute d'aller attaquer un sbire magique.",
      tags: ["Duel", "Pression"],
      details: [
        { type: "p", text: "Chaque coup porté au sol (vers les sbires) rend un joueur vulnérable durant l'animation. Si votre ennemi veut achever son Canon pour gagner 60 PO, il s'immobilise pour tirer." },
        { type: "p", text: "Adoptez la Trading Stance juste en étant immobile et à portée. Au moment précis de l'impact, lancez TOUS vos sortilèges combinés (Poke) sur la tête de votre ennemi sans qu'il ne puisse riposter." },
        { type: "tip", text: "Les meilleurs joueurs punissent TOUJOURS le sbire charette adverse avec un combo garanti sans riposte." }
      ]
    }
  ],
  roles: [
    {
      id: 'top',
      title: "Toplane : Le Continent Mêlée", 
      type: "icon",
      icon: <Flag className="text-orange-400" size={36}/>,
      background: "from-orange-500/20 to-red-500/5",
      desc: "Tanks infatigables et Bruisers terrifiants se disputant le premier sang en solitaire.",
      tags: ["Combattant", "Dueliste"],
      details: [
        { type: "p", text: "Le top est une ligne colossale, cruelle et sans véritable retour en lisière. Faire une faute équivaut à un 'Freeze de Vague' inarrêtable qui détruit entièrement votre expérience pour 10 bonnes minutes. La force d'un toplaner se définit via le contrôle chirurgical de cette ligne." },
        { type: "tip", text: "On dit que 'TP est la magie du Top'. Elle ne sert pas à revenir 5 secondes plus vite sur sa ligne, elle sert à débarquer instantanément dans un combat de mêlée (Teamfight) se déroulant à la Botlane afin de balayer totalement l'équipe ennemie avec la furie d'un colosse (Flank TP)." }
      ]
    },
    {
      id: 'jungle',
      title: "Le Jungler : Variable d'Ajustement", 
      type: "icon",
      icon: <Star className="text-emerald-400" size={36}/>,
      background: "from-emerald-500/20 to-teal-500/5",
      desc: "Se nourrit des loups pour survenir des buissons à l'improviste sur la carte globale.",
      tags: ["Impact Global", "Objectifs"],
      details: [
        { type: "p", text: "Il dirige les tambours de la partie. Au lieu de ramasser de l'Or via les vagues ennuyeuses, le jungler parcourt l'échiquier et planifie des ganks (guet-apens avec infériorité numérique) imprévisibles contre les lignards." },
        { type: "p", text: "Le 'Smite' (Châtiment) est le sort d'invocateur le plus déterminant de tous. Il peut exécuter un monstre avec force brute de X dégâts bruts (selon le niveau) rendant le jungler absolument vital pour abattre sans appel le Baron Nashor final." },
        { type: "tip", text: "Un bon Jungler ne joue JAMAIS selon son intuition au hasard. Il lit la ligne à 'Gank', scrute qui a brûlé son sort Flash. Si le Top n'a plus Foudre/Flash, c'est lui la cible la viande pour redescendre la rivière le couteau à la main (Gank Répétitifs)." }
      ]
    },
    {
      id: 'mid',
      title: "Midlane : Pivôt de la Carte", 
      type: "icon",
      icon: <Crosshair className="text-purple-400" size={36}/>,
      background: "from-purple-500/20 to-indigo-500/5",
      desc: "Cœur de la symétrie. Des Mages aux Dégâts explosifs (Burst) ou des Assassins aux couteaux dissimulés.",
      tags: ["Burst", "Roam", "Assassin"],
      details: [
        { type: "p", text: "La ligne est exceptionnellement courte. Protégée par des parois étroites, c'est l'apanage des joueurs requérants des XP colossaux sans se compromettre sur la distance géographique (Zed, Yasuo, Ahri, Syndra)." },
        { type: "p", text: "L'attente magistruale de cette position est de devenir le 'Roamer' : Pousser prestement (Crash) ses 6 sbires vers l'adversaire (qui n'a plus l'audace de faire quelque chose de peur d'être attaqué depuis les angles sombres), marcher dans la rivière obscure vers l'objectif bas de la carte avec ses griffes pour terrifier puis pulvériser un Duo sur le point d'arriver." },
        { type: "tip", text: "La plus grosse erreur au midlaner n'est pas de mal faire le duel... C'est de s'encastrer physiquement dans la tour de la voie centrale (Freeze impossible ou Towerdive) et refuser d'aller sauver les jungles latérales !" }
      ]
    },
    {
      id: 'adc',
      title: "ADC : L'Artillerie de Survie", 
      type: "icon",
      icon: <Target className="text-yellow-400" size={36}/>,
      background: "from-yellow-500/20 to-amber-500/5",
      desc: "Fragilité folle couplée à des Dégâts par Seconde continus indéchirables. Focus exclusif sur un farm millimétré.",
      tags: ["DPS", "Positionnement"],
      details: [
        { type: "p", text: "Si les Burst (Dégâts instantanés Midlaners) sont bons pendant les affrontements sporadiques, c'est véritablement l'Ad Carry (Le Tiré ou 'Attack Damage Carry' comme Jinx ou Vayne) qui fendra un énorme et monstrueux Ornn niveau 18 comme un beurre chaud." },
        { type: "tip", text: "Votre plus grande discipline comme ADC est l'évasion psychotique. Tenez-vous le plus reculé possible. Votre objectif UNIQUE en TeamFight de cinq contre cinq est de balancer vos balles depuis tout au bout du monde. Tuez scrupuleusement le bloc de briques placé au devant de vous (même le Malphite tank de 400 armure). C'est votre rôle formel !" }
      ]
    },
    {
      id: 'support',
      title: "Support : Vision et Dictature", 
      type: "icon",
      icon: <ShieldAlert className="text-cyan-400" size={36}/>,
      background: "from-cyan-500/20 to-sky-500/5",
      desc: "L'œil du faucon de l'Armée. Son rôle va bien au delà du couvée de son ADC. Il est la Carte en personne.",
      tags: ["Vision", "Control", "Peel"],
      details: [
        { type: "p", text: "Il ne s'intéresse jamais au dernier tapage des sbires, ce qui lui donne la liberté entière de perturber le duel d'avancement par tous les angles." },
        { type: "p", text: "Lame de la dictature du jeu via la balise de contrôle lumineuse (Ward). En contrôlant le champ de vision (FoW), il permet à tous les Assassins de contourner l'horizon pour effondrer les combats victorieux aux Dragons." },
        { type: "tip", text: "De plus en plus, le 'Support' se détache pour effectuer de sombres périples au centre du terrain. C'est le 'Support Roam', l'action de sacrifier partiellement l'EXP pure de la duolane inférieure pour terroriser mortellement la voie milieu et arracher un Flash ou une vie en combinaison avec le Jungler (Pression de la Trilane)." }
      ]
    },
    {
      id: 'vision',
      title: "Vision et Brouillard de Guerre", 
      type: "icon",
      icon: <Eye className="text-emerald-400" size={36}/>,
      background: "from-emerald-500/20 to-teal-500/5",
      desc: "Le Brouillard (Fog of War) cache les mouvements ennemis. La vision dicte qui gagne la partie.",
      tags: ["Info", "Wards"],
      details: [
        { type: "p", text: "Si vous ne voyez pas les ennemis, partez du principe qu'ils sont en train d'avancer vers vous. C'est la règle d'or." },
        { type: "p", text: "Acheter une Balise de Contrôle (Pink Ward, 75 PO) révèle les pièges et désactive les balises adverses. Ne sortez jamais de la base sans une s'il vous reste de la place !" },
        { type: "tip", text: "Placez toujours vos balises (Wards) de manière asymétrique : au lieu de warder juste devant vous (buisson latéral), placez une balise très loin dans la rivière ou dans la jungle ennemie pour repérer le danger 10 secondes plus tôt." }
      ]
    },
    {
      id: 'cc',
      title: "Contrôles de Foule (CC)", 
      type: "icon",
      icon: <ZapOff className="text-indigo-400" size={36}/>,
      background: "from-indigo-500/20 to-blue-500/5",
      desc: "Étourdissements, Ralentissements, Immobilisations... Les CC (Crowd Control) gagnent les Teamfights.",
      tags: ["Combat", "Types"],
      details: [
        { type: "p", text: "Il existe des CC légers (Ralentissements) et des CC absolus (Étourdissement/Stun, Projection en l'air, Suppression). Si vous êtes frappé par un CC absolu, vous ne pouvez utiliser aucun sort (sauf la Purge)." },
        { type: "p", text: "La statistique 'Ténacité' réduit fortement la durée de presque TOUS les contrôles (sauf les projections et suppressions)." },
        { type: "tip", text: "Dans la sélection des champions, veillez toujours à ce que votre équipe possède au moins un solide CC d'engagement (ex: l'Ultime d'Amumu ou de Leona). Une équipe composée à 100% de dégâts purs perdra toujours contre une équipe qui peut paralyser ses ennemis." }
      ]
    }
  ],
  equipment: [
    {
      id: 'summoners',
      title: "Sorts d'Invocateur (Summoners)",
      type: "icon",
      icon: <Zap className="text-yellow-400" size={36}/>,
      background: "from-yellow-500/20 to-amber-500/5",
      desc: "Flash, Ignite, TP... Éléments vitaux pour tout duel.",
      tags: ["Magie", "Essentiel"],
      details: [
        { type: "p", text: "Le Flash (Saut Éclair) est le sort le plus vital, utilisé par 99% des joueurs. Outil offensif comme défensif, un joueur sans Flash est une proie facile. Ne le gâchez jamais pour fuir si votre mort est déjà 100% inévitable." },
        { type: "p", text: "Le Châtiment (Smite) inflige des dégâts purs incroyables aux monstres et soigne son lanceur : il est le seul sort strict et obligatoire pour un Jungler afin de voler/garantir le Nashor. Ne jouez pas sans ! Le Fantôme (Ghost) offre une fuite ou un rush inarrêtable à travers les unités pour les champions massifs comme Darius ou Hecarim." },
        { type: "p", text: "L'Embrasement (Ignite) ajoute de terrifiants dégâts purs avec le temps sur un ennemi, tout en divisant ses soins reçus par deux (Hémorragie). La Téléportation (TP) permet de rejoindre instantanément une structure ou une balise alliée pour renverser un combat à 5 contre 4 ou de contrer un Freeze." },
        { type: "p", text: "La Fatigue (Exhaust) paralyse littéralement un dangereux assassin ennemi explosif (Katarina, Zed), en réduisant drastiquement sa vitesse de déplacement et ses dégâts pendant 3 grosses secondes. Le Soin (Heal), la Barrière (Barrier) et la Purge (Cleanse) sont d'excellents outils de survie pour les cibles de l'arrière-garde (Tireurs)." },
        { type: "tip", text: "Si l'adversaire principal en face de vous 'claque' (utilise) son Flash défensivement, écrivez 'mid f' dans le chat ou signalez-le (Ping) en cliquant dessus ! Votre Jungler dispose maintenant d'exactement 5 minutes libres (300 secondes de récupération) pour venir camper l'ennemi en toute facilité." }
      ]
    },
    {
      id: 'anti_tank',
      title: "L'Armurerie Anti-Tank (Perce-Armure)",
      type: "icon",
      icon: <Crosshair className="text-orange-400" size={36}/>,
      background: "from-orange-500/20 to-red-500/5",
      desc: "Prendre d'assaut un colosse à 5000 PV nécessite des mathématiques de base, pas des dégâts plats.",
      tags: ["Létalité", "Pénétration"],
      details: [
        { type: "p", text: "Pour infliger des réels dégâts à un Tank en fin de partie, vous DEVEZ acheter des objets infligeant des dégâts en 'Pourcentage de PV Max' (comme la Lame du Roi Déchu ou Tourment de Liandry)." },
        { type: "p", text: "Face aux Tanks, un objet avec 'Pénétration en Pourcentage' (Dominik, Bâton du Vide = 30%) ignorera un immense bloc d'armure. À l'inverse, la 'Létalité' ignore un montant fixe, la rendant ridicule contre eux, mais dévastatrice et obligatoire face aux Mages/Tireurs fragiles." },
        { type: "tip", text: "N'achetez JAMAIS le Percepteur (Collector) face à 3 énormes Tanks avec de l'armure (Sion, Sejuani, Braum) : c'est un très mauvais calcul d'investir 3000 Or dans de la statistique de létalité contre des blocs de Titane. Optez toujours pour l'Anti-Armure pure pourcentage." }
      ]
    },
    {
      id: 'anti_heal',
      title: "Contrer le Vol de Vie (Anti-Soin)",
      type: "icon",
      icon: <Skull className="text-fuchsia-400" size={36}/>,
      background: "from-fuchsia-500/20 to-pink-500/5",
      desc: "L'Hémorragie (Grievous Wounds) est absolue pour abattre Soraka, Sylas, Aatrox ou Briar.",
      tags: ["Adaptation", "Survie"],
      details: [
        { type: "p", text: "Dès votre premier retour (Recall), si vous jouez contre un champion qui vampirise et régénère sans arrêt comme un monstre, achetez instantanément l'Orbe de l'Oubli (Mages) ou la Marque du Bourreau (AD) à seulement 800 Or." },
        { type: "p", text: "Ces petits composants appliquent l'Hémorragie, réduisant TOUS les soins subséquents de la cible de 40%. C'est mathématiquement le meilleur investissement et l'item incontournable du jeu face à eux." },
        { type: "tip", text: "Ne finissez PAS le gros objet Anti-Heal en cours de duel (comme Construire complétement le Morellonomicon ou la Cotte Épineuse). Achetez juste le petit composant à 800 Or requis le plus tôt possible, et reprenez la création de votre premier Objet Mythique Core." }
      ]
    },
    {
      id: 'demolish',
      title: "Le Siège & Destruction",
      type: "icon",
      icon: <Anchor className="text-cyan-400" size={36}/>,
      background: "from-cyan-500/20 to-blue-500/5",
      desc: "Fendre l'architecture. Comment effondrer le béton adverse très rapidement sur sa ligne.",
      tags: ["Splitpush", "Tour"],
      details: [
        { type: "p", text: "Certaines classes de champions orientent tout leur but en Solo-Q pour détruire les structures (Splitpush). Tryndamere, Yorick, Trundle ou Jax détruisent des immenses tours en quelques millisecondes s'ils sont laissés isolés." },
        { type: "p", text: "Des items comme le 'Brise-coques' (Hullbreaker) ou la célèbre 'Brillance' (Force de la Trinité) ajoutent des multiplicateurs de fracas bonus qui s'abattent lourdement sur la barre de PV des Tours Ennemies de façon exclusive." },
        { type: "tip", text: "La Rune mineure 'Démolition' dans l'arbre Volonté exige que vous approchiez du socle d'une tour ennemie. Combinée à la présence du buff des 5 Larves du Néant, vous effondrerez une Tour Tier 2 qui était à 100% de sa vie en frappant une seule misérable fois le mur." }
      ]
    }
  ]
};

function getHeroImage(id) {
  const map = {
    cs: 'Sivir_0', kda: 'Jhin_0', xp: 'Zilean_0', scaling: 'Kayle_0',
    baron: 'Belveth_0', dragons: 'Shyvana_0', elder: 'AurelionSol_0', herald: 'RekSai_0', grubs: 'KogMaw_0', scuttle: 'TahmKench_0',
    kiting: 'Ashe_0', freeze: 'Lissandra_0', prio: 'Talon_0', peel: 'Janna_0', trading: 'Fiora_0',
    vision: 'Teemo_0', cc: 'Leona_0',
    top: 'Darius_0', jungle: 'LeeSin_0', mid: 'Ahri_0', adc: 'Jinx_0', support: 'Thresh_0',
    summoners: 'Ryze_0', anti_tank: 'Vayne_0', anti_heal: 'Vladimir_0', demolish: 'Yorick_0'
  };
  const champ = map[id] || 'Garen_0';
  return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ}.jpg`;
}

// Modal Component for Content Details
function DetailModal({ item, onClose }) {
  if (!item) return null;
  
  return (
    <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md flex items-center justify-center py-10 px-6 sm:px-12 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 z-0" 
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-[950px] h-[850px] max-h-full bg-[#0f0f13] border border-white/20 shadow-[0_0_80px_rgba(0,0,0,0.9)] rounded-3xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header Hero Area */}
        <div className="relative h-64 md:h-80 flex flex-col items-center justify-end overflow-hidden shrink-0 pb-6 rounded-t-3xl border-b border-white/5">
          <div 
            className="absolute inset-0 bg-cover bg-top bg-no-repeat opacity-60 mix-blend-luminosity"
            style={{ backgroundImage: `url(${getHeroImage(item.id)})` }}
          />
          <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 mix-blend-color", item.background || "from-blue-500 to-purple-500")} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-[#0f0f13]/60 to-transparent z-0" />
          
          <button onClick={onClose} className="absolute top-6 right-6 z-50 p-2.5 bg-black/40 hover:bg-black/80 text-white rounded-full transition-colors border border-white/10 group backdrop-blur-md">
             <span className="sr-only">Retour</span>
             <X className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-90 transition-transform" />
          </button>

          <div className="relative z-10 flex flex-col items-center mt-auto translate-y-3">
             <div className="bg-black/50 backdrop-blur-md rounded-2xl p-4 md:p-5 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] mb-4 text-white">
                {item.icon}
             </div>
             <h2 className="text-3xl md:text-5xl font-black text-white text-center italic tracking-tighter mx-4 drop-shadow-[0_5px_15px_rgba(0,0,0,1)] leading-tight">{item.title}</h2>
          </div>
        </div>

        {/* Detail Content Body - Added scrollbar styling properly */}
        <div className="p-6 md:px-8 pb-16 overflow-y-auto flex-1 min-h-0 bg-[#0f0f13] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
           <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-white/5 pb-6">
              {item.tags?.map(t => (
                 <span key={t} className="text-xs font-black uppercase tracking-widest text-[#a3a3a3] border-white/10 px-3 py-1 rounded-lg border">{t}</span>
              ))}
           </div>
           
           <div className="space-y-6 pb-12">
              {item.details?.map((det, i) => {
                 if (det.type === 'p') {
                    return <p key={i} className="text-gray-300 text-[15px] md:text-base leading-relaxed font-medium">{det.text}</p>
                 } else if (det.type === 'tip') {
                    return (
                      <div key={i} className="bg-accent-primary/[0.08] border border-accent-primary/20 rounded-2xl p-6 md:p-8 relative overflow-hidden mt-8">
                         <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none">
                           <Lightbulb size={80} />
                         </div>
                         <div className="flex items-center gap-3 mb-4 relative z-10">
                           <div className="bg-accent-primary rounded-full p-1.5 text-black">
                             <Lightbulb size={20} className="stroke-[2.5]" />
                           </div>
                           <span className="font-extrabold text-accent-primary text-sm uppercase tracking-widest">Conseil de Pro</span>
                         </div>
                         <p className="text-white text-base md:text-lg italic leading-relaxed relative z-10">{det.text}</p>
                      </div>
                    )
                 }
                 return null;
              })}
           </div>
        </div>
        
      </div>
    </div>
  );
}

export default function TutorialView({ panelClass, t }) {
  const [activeCat, setActiveCat] = useState('basics');
  const [search, setSearch] = useState('');
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeDetail, setActiveDetail] = useState(null);
  
  const currentContent = TUTORIAL_CONTENT[activeCat].filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={cn(panelClass, "absolute inset-0 flex flex-col p-6 lg:p-10 overflow-hidden")}>
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 w-full border-b border-white/5 pb-8 relative shrink-0">
        <div className="absolute right-0 top-0 -z-10 w-64 h-64 bg-accent-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl border border-accent-primary/30 bg-accent-primary/[0.08] shadow-[0_0_15px_rgba(59,130,246,0.15)] text-accent-primary">
              <BookOpen size={24} />
            </div>
            <h1 className="text-4xl font-black text-white italic tracking-tighter drop-shadow-md">
              ORACLE <span className="bg-gradient-to-r from-accent-primary to-purple-400 bg-clip-text text-transparent pr-2">ACADEMY</span>
            </h1>
          </div>
          <p className="text-gray-400 text-sm md:text-base max-w-xl font-medium leading-relaxed">
            Un guide complet et détaillé pour maîtriser le jargon, la théorie et les mécaniques avancées de League of Legends. Votre route vers le Challenger commence ici.
          </p>
        </div>
        
        <div className="relative w-full md:w-72 z-10 shrink-0">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Rechercher (ex: Freeze...)" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1e1e24] border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/30 transition-shadow"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
        
        {/* Sidebar Nav */}
        <div className="w-full lg:w-64 shrink-0 flex flex-col gap-2 pb-4 pr-2 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setActiveCat(cat.id); setSearch(''); }}
              className={cn(
                "w-full flex items-center gap-3 p-4 rounded-2xl border text-left transition-all duration-300 group relative overflow-hidden",
                activeCat === cat.id 
                  ? "bg-white/[0.04] border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)] pb-4" 
                  : "bg-transparent border-transparent hover:bg-white/[0.02]"
              )}
            >
              <div className={cn(
                "p-2 rounded-lg flex items-center justify-center transition-all",
                activeCat === cat.id ? `bg-gradient-to-r ${cat.color} text-white shadow-md relative z-10` : "bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-white"
              )}>
                {cat.icon}
              </div>
              <span className={cn(
                "font-bold text-sm transition-colors relative z-10",
                activeCat === cat.id ? "text-white tracking-wide" : "text-gray-400 group-hover:text-gray-200"
              )}>{cat.label}</span>
              
              {activeCat === cat.id && (
                <div className={cn(`absolute inset-y-0 right-0 w-32 bg-gradient-to-l opacity-20 ${cat.color}`, "blur-xl")} />
              )}
            </button>
          ))}
          
          <div className="mt-auto pt-6 border-t border-white/5 relative">
            <div className="bg-[#121216] border border-white/5 rounded-2xl p-5 relative overflow-hidden group cursor-default">
               <div className="absolute right-2 top-2 text-accent-primary/10 group-hover:scale-110 transition-transform">
                  <MonitorPlay size={64} />
               </div>
               <div className="flex items-center gap-2 mb-2 relative z-10">
                 <Info size={16} className="text-blue-400" />
                 <span className="font-bold text-sm text-gray-200">Tips Macro</span>
               </div>
               <p className="text-xs text-gray-500 font-medium leading-relaxed relative z-10">Cliquez sur une carte pour dérouler les astuces de Pro et approfondir votre lecture.</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 rounded-3xl pr-4 pb-20 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {currentContent.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => setActiveDetail(item)}
                className="bg-[#0a0a0c]/80 cursor-pointer backdrop-blur-md border border-white/5 hover:border-white/10 transition-all rounded-[2rem] p-6 flex flex-col group relative overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none group-hover:from-white/[0.05] transition-colors" />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white">
                  <div className="rotate-45"><ArrowRight className="w-4 h-4" /></div>
                </div>
                
                <div className="flex items-start gap-5 relative z-10 pr-6">
                  <div 
                    className={cn(
                        "shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center overflow-hidden relative transition-all duration-300 border",
                        item.type === 'video' 
                          ? "bg-[#121216] border-white/10 group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]" 
                          : `border-white/5 bg-gradient-to-br ${item.background || 'from-white/[0.05] to-transparent'} shadow-inner`
                    )}
                    onClick={(e) => { 
                      if (item.type === 'video') { 
                        e.stopPropagation(); 
                        setActiveVideo(item.videoId); 
                      } 
                    }}
                  >
                    {item.type === 'video' ? (
                      <div className="w-full h-full relative flex items-center justify-center bg-black">
                         <img src={`https://img.youtube.com/vi/${item.videoId}/mqdefault.jpg`} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-40 transition-opacity" alt="thumb" />
                         <PlayCircle size={36} className="text-white relative z-10 drop-shadow-md group-hover:scale-125 group-hover:text-blue-400 transition-all duration-300" />
                      </div>
                    ) : (
                      <div className="transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500 drop-shadow-[0_5px_10px_rgba(0,0,0,0.6)] text-white/90">
                        {item.icon}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {item.tags?.map(t => (
                        <span key={t} className="text-[10px] font-black uppercase tracking-widest text-[#a3a3a3] group-hover:text-white px-2 py-0.5 rounded-lg border border-white/5 group-hover:bg-accent-primary/20 group-hover:border-accent-primary/40 transition-colors">{t}</span>
                      ))}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2 group-hover:text-accent-primary transition-colors line-clamp-1">{item.title}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-medium line-clamp-3">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {currentContent.length === 0 && (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-gray-500">
                <Search size={48} className="mb-4 opacity-20" />
                <h3 className="text-lg font-bold text-gray-400 mb-2">Aucun Résultat</h3>
                <p className="text-sm">Aucun tutoriel ne correspond à "{search}".</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Detail Modal Overlay */}
      <DetailModal item={activeDetail} onClose={() => setActiveDetail(null)} />

    </div>
  );
}
