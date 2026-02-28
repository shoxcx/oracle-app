const fs = require('fs');

const data = fs.readFileSync('c:\\Users\\User\\.gemini\\antigravity\\conversations\\fb3a7fd3-6d3a-487b-a8d4-46b496e16924.pb', 'latin1');
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
    // Look for any jsx
    const compIdx = data.lastIndexOf('<div className=');
    if (compIdx !== -1) {
        fs.writeFileSync('extracted_app.txt', data.substring(Math.max(0, compIdx - 500), compIdx + 10000), 'latin1');
        console.log('Saved random component');
    }
}
