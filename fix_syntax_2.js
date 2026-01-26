const fs = require('fs');
const path = "c:/Users/User/.gemini/antigravity/scratch/lol-tracker/src/App.jsx";
let content = fs.readFileSync(path, 'utf8');

// The corrupted area seems to be around here:
// kaDiff: (parseFloat(avgKaDiff) > 0 ? "+" : "") + avgKaDiff,

const searchStr = "      kaDiff: (parseFloat(avgKa";
const startIdx = content.indexOf("      kaDiff:");
if (startIdx !== -1) {
    // Find the end of this property or the next one
    const endIdx = content.indexOf("history: hist", startIdx);
    if (endIdx !== -1) {
        const nextPartIdx = content.indexOf("    };", endIdx);
        const targetCode = `      kaDiff: (parseFloat(avgKaDiff) > 0 ? "+" : "") + avgKaDiff,\n      history: hist\n    };\n  }, [matchHistory, displayUser]);`;

        const finalStart = content.lastIndexOf("      kaDiff:", endIdx);
        const finalEnd = content.indexOf("}, [matchHistory, displayUser]);", finalStart) + "}, [matchHistory, displayUser]);".length;

        content = content.substring(0, finalStart) + targetCode + content.substring(finalEnd);
        fs.writeFileSync(path, content, 'utf8');
        console.log("Fixed!");
    } else {
        console.log("Could not find history: hist");
    }
} else {
    console.log("Could not find kaDiff:");
}
