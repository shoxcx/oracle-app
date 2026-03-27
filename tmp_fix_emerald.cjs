const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

// Replace the URL logic in getMiniCrest and getRankIcon
code = code.replace(/return key === 'emerald' \? 'https:\/\/raw\.communitydragon\.org\/latest\/plugins\/rcp-fe-lol-shared-components\/global\/default\/emerald\.png' : `https:\/\/raw\.communitydragon\.org\/latest\/plugins\/rcp-fe-lol-static-assets\/global\/default\/images\/ranked-mini-crests\/\$\{key\}\.png`;/g, 
  "return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/${key === 'emerald' ? 'platinum' : key}.png`;");

// Replace inline URL logic for oracle_estimate
code = code.replace(/src=\{highestTier\.toLowerCase\(\) === 'emerald' \? 'https:\/\/raw\.communitydragon\.org\/latest\/plugins\/rcp-fe-lol-shared-components\/global\/default\/emerald\.png' : `https:\/\/raw\.communitydragon\.org\/latest\/plugins\/rcp-fe-lol-static-assets\/global\/default\/images\/ranked-mini-crests\/\$\{highestTier\.toLowerCase\(\)\}\.png`\}/g,
  "src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/${highestTier.toLowerCase() === 'emerald' ? 'platinum' : highestTier.toLowerCase()}.png`}");

// Replace img tags to inject hue-rotate class
code = code.replace(/<img src=\{getRankIcon\(solo\.tier\)\} className="w-4 h-4 object-contain" alt=\{solo\.tier\} \/>/g, 
  "<img src={getRankIcon(solo.tier)} className={cn('w-4 h-4 object-contain', (solo.tier || '').toUpperCase() === 'EMERALD' && 'hue-rotate-[-40deg] saturate-150 brightness-110')} alt={solo.tier} />");

code = code.replace(/<img src=\{getRankIcon\(rank\.tier\)\} className="w-5 h-5 object-contain" alt="" \/>/g, 
  "<img src={getRankIcon(rank.tier)} className={cn('w-5 h-5 object-contain', (rank.tier || '').toUpperCase() === 'EMERALD' && 'hue-rotate-[-40deg] saturate-150 brightness-110')} alt='' />");

code = code.replace(/className="w-5 h-5 drop-shadow-md object-contain"\n\s+onError/g, 
  "className={cn('w-5 h-5 drop-shadow-md object-contain', (highestTier || '').toUpperCase() === 'EMERALD' && 'hue-rotate-[-40deg] saturate-150 brightness-110')}\\n                onError");

fs.writeFileSync('src/App.jsx', code, 'utf8');
console.log('Done!');
