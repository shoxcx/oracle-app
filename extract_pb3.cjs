const fs = require('fs');

const file = process.argv[2] || 'c:\\Users\\User\\.gemini\\antigravity\\conversations\\229b4707-9b53-40aa-a14c-7979bbd48e52.pb';
const data = fs.readFileSync(file, 'latin1');
console.log('File read, size:', data.length);

const snippets = [];
let idx = 0;
while (true) {
    const nextIdx = data.indexOf('function App', idx);
    if (nextIdx === -1) break;
    let start = nextIdx;
    // find preceding `import React`
    const importIdx = data.lastIndexOf('import ', nextIdx);
    if (importIdx !== -1 && nextIdx - importIdx < 1000) {
        start = importIdx;
    }
    let end = nextIdx + 50000;
    if (end > data.length) end = data.length;
    snippets.push(data.substring(start, end));
    idx = nextIdx + 10;
}
console.log('App components found:', snippets.length);

if (snippets.length > 0) {
    // Save the LAST one found (chronologically the newest version in the PB file probably?)
    fs.writeFileSync('extracted_app.txt', snippets[snippets.length - 1], 'latin1');
    console.log('Saved to extracted_app.txt');
} else {
    // Try to find any tool calls, to see what AI did
    console.log('No blocks, checking for tool calls:');
    const cmds = data.match(/git [^\\]+/g) || [];
    console.log('git cmds:', cmds.slice(0, 10));
}
