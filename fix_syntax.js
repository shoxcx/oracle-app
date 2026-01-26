const fs = require('fs');
const path = "c:/Users/User/.gemini/antigravity/scratch/lol-tracker/src/App.jsx";
let content = fs.readFileSync(path, 'utf8');

// The block we want to fix
const target = `    return {
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
    };`;

// Let's find the start of the return block near line 2256
const startMarker = "    return {";
const searchStartIndex = content.indexOf("const avgKaDiff = validDiffCount");
const blockStartIndex = content.indexOf(startMarker, searchStartIndex);
const blockEndIndex = content.indexOf("};", blockStartIndex) + 2;

if (blockStartIndex !== -1) {
    console.log("Found block to replace at index:", blockStartIndex);
    const newContent = content.substring(0, blockStartIndex) + target + content.substring(blockEndIndex);
    fs.writeFileSync(path, newContent, 'utf8');
} else {
    console.error("Could not find block to replace");
}
