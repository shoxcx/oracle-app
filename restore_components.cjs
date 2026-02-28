const fs = require('fs');
const path = require('path');

console.log("Starting restore script...");
const filePath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(filePath, 'utf8');

function restoreComponent(name, iconName, wipTitle, wipDesc, args) {
    console.log(`Restoring ${name}...`);
    const startSig = `function ${name}`;
    const startIndex = content.indexOf(startSig);
    if (startIndex === -1) {
        console.error("Not found:", name);
        return;
    }

    // Find the marker of the broken signature: "}) {"
    // This assumes the parameters were { ... } and we kept the braces.
    const brokenMarker = "}) {";
    const markerIndex = content.indexOf(brokenMarker, startIndex);

    if (markerIndex === -1 || markerIndex - startIndex > 2000) {
        console.error("Could not find broken marker for", name);
        return;
    }

    // The "{" in "}) {" is the start of the original body
    const bodyStart = markerIndex + brokenMarker.length - 1;

    // Walk to find end of original body
    let braceCount = 1;
    let i = bodyStart + 1;
    while (braceCount > 0 && i < content.length) {
        if (content[i] === '{') braceCount++;
        if (content[i] === '}') braceCount--;
        i++;
    }

    const bodyEnd = i; // This is the index AFTER the last }

    const newContent = `function ${name}(${args}) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-12 animate-in fade-in zoom-in duration-500">
      <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
        <${iconName} size={48} className="text-gray-500 animate-pulse" />
      </div>
      <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2 opacity-80">${wipTitle}</h2>
      <p className="text-gray-500 font-bold uppercase tracking-widest text-xs max-w-md leading-relaxed opacity-60">${wipDesc}</p>
      <div className="mt-8 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[10px] font-mono text-gray-600">
        FEATURE DISABLED FOR MAINTENANCE
      </div>
    </div>
  )
}`;

    content = content.slice(0, startIndex) + newContent + content.slice(bodyEnd);
    console.log(`Repaired ${name}`);
}

restoreComponent('BuildView', 'Sparkles', 'WIP', 'Tierlist & Builds are under construction.', '{ t, panelClass, initialChamp, ddragonVersion }');

restoreComponent('RankingsView', 'Trophy', 'WIP', 'Rankings & Leaderboards are being updated.', '{ panelClass, t, setTargetSummoner, setActiveTab, ddragonVersion }');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Done");
