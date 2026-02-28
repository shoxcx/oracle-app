const fs = require('fs');

const file = 'c:\\Users\\User\\.gemini\\antigravity\\conversations\\59154b21-ec14-4d0d-9ff1-05862179d853.pb';
const data = fs.readFileSync(file, 'latin1');
console.log('File read, size:', data.length);

const snippets = [];
let idx = 0;
while (true) {
    // Let's find common markers for the app file in lol-tracker like 'import { LayoutDashboard' or 'function App' or 'return ('
    const nextIdx = data.indexOf('LayoutDashboard', idx);
    if (nextIdx === -1) break;
    let start = nextIdx;
    const importIdx = data.lastIndexOf('import ', nextIdx);
    if (importIdx !== -1 && nextIdx - importIdx < 1000) {
        start = importIdx;
    }
    let end = nextIdx + 300000;
    if (end > data.length) end = data.length;
    // find the end of the file or block
    const closeIdx = data.indexOf('\n}\n', nextIdx + 10000);
    if (closeIdx !== -1 && closeIdx < end) end = closeIdx + 3;

    snippets.push(data.substring(start, end));
    idx = nextIdx + 10;
}
console.log('App components found:', snippets.length);

if (snippets.length > 0) {
    // Save the LAST one found (chronologically the newest version in the PB file probably?)
    fs.writeFileSync('extracted_app.txt', snippets[snippets.length - 1], 'latin1');
    console.log('Saved to extracted_app.txt length:', snippets[snippets.length - 1].length);
}
