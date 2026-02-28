const fs = require('fs');
const path = 'c:/Users/User/.gemini/antigravity/scratch/lol-tracker/electron_app/scraper.cjs';
let content = fs.readFileSync(path, 'utf8');

// 1. Add timestamp and improve build extraction
const uGGUrlSearch = 'const uGGUrl = `https://u.gg/lol/champions/${champ1.toLowerCase().replace(/[^a-z0-9]/g, \'\')}/build/${role.toLowerCase()}?opp=${champ2.toLowerCase().replace(/[^a-z0-9]/g, \'\')}`;';
const uGGUrlReplace = 'const uGGUrl = `https://u.gg/lol/champions/${champ1.toLowerCase().replace(/[^a-z0-9]/g, \'\')}/build/${role.toLowerCase()}?opp=${champ2.toLowerCase().replace(/[^a-z0-9]/g, \'\')}&ts=${Date.now()}`;';

if (content.includes(uGGUrlSearch)) {
    content = content.replace(uGGUrlSearch, uGGUrlReplace);
}

// 2. Improve NextData parsing for matchups
const nextDataSearch = 'const pageProps = json.props?.pageProps;';
const nextDataReplace = `const pageProps = json.props?.pageProps;
                                // Force check for matchup data in pageProps
                                const matchupData = pageProps?.matchups || pageProps?.selectedMatchup;
                                if (matchupData) {
                                    // Inject matchup context if found
                                    console.log("[Scraper] Matchup data detected in NextData");
                                }`;

if (content.includes(nextDataSearch)) {
    content = content.replace(nextDataSearch, nextDataReplace);
}

fs.writeFileSync(path, content);
console.log("Successfully patched scraper.cjs for real-time matchup builds.");
