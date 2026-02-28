const fs = require('fs');
const path = require('path');

console.log("Starting update script...");

try {
    const filePath = path.join(__dirname, 'src', 'App.jsx');
    console.log("Reading file:", filePath);

    if (!fs.existsSync(filePath)) {
        throw new Error("File not found: " + filePath);
    }

    let content = fs.readFileSync(filePath, 'utf8');
    console.log("File read successfully, size:", content.length);

    function replaceComponentBody(name, wipTitle, wipDesc, iconName) {
        console.log(`Processing ${name}...`);

        // Search for the function definition. 
        // We assume it starts with "function Name(" or "function Name ("
        let startIndex = content.indexOf(`function ${name}`);
        if (startIndex === -1) {
            console.error(`Could not find "function ${name}"`);
            return;
        }

        // Find the opening brace of the function body
        let openBraceIndex = content.indexOf('{', startIndex);

        // Safety check: ensure we didn't skip too far (e.g. into another function)
        // The signature shouldn't be excessively long.
        if (openBraceIndex === -1 || openBraceIndex - startIndex > 500) {
            console.error(`Could not find opening brace for ${name} near index ${startIndex}`);
            return;
        }

        // Count braces to find the end
        let braceCount = 1;
        let endIndex = openBraceIndex + 1;

        while (braceCount > 0 && endIndex < content.length) {
            if (content[endIndex] === '{') braceCount++;
            if (content[endIndex] === '}') braceCount--;
            endIndex++;
        }

        if (braceCount !== 0) {
            console.error(`Could not find closing brace for ${name}`);
            return;
        }

        const bodyEnd = endIndex - 1; // Index of the final }

        const newBody = `
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
`;

        // Replace everything between the FIRST opening brace and the LAST closing brace
        content = content.slice(0, openBraceIndex + 1) + newBody + content.slice(bodyEnd);
        console.log(`Replaced body of ${name}`);
    }

    replaceComponentBody('BuildView', 'WIP', 'Tierlist & Builds are under construction.', 'Sparkles');
    replaceComponentBody('RankingsView', 'WIP', 'Rankings & Leaderboards are being updated.', 'Trophy');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('File written successfully.');
    console.log('Done');
} catch (error) {
    console.error("FATAL ERROR:", error);
}
