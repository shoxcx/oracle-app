const fs = require('fs');
const path = require('path');

const historyDir = 'C:\\Users\\User\\AppData\\Roaming\\Code\\User\\History';

function walkDir(dir) {
    let results = [];
    try {
        const list = fs.readdirSync(dir);
        list.forEach(file => {
            const full = path.join(dir, file);
            const stat = fs.statSync(full);
            if (stat && stat.isDirectory()) {
                results = results.concat(walkDir(full));
            } else {
                results.push({ file: full, stat });
            }
        });
    } catch (e) { }
    return results;
}

const found = walkDir(historyDir);

// Sort by modified newest first
found.sort((a, b) => b.stat.mtimeMs - a.stat.mtimeMs);

console.log(`Checking the newest VS Code history files...`);

let c = 0;
for (let f of found) {
    if (f.file.endsWith('entries.json')) continue;
    try {
        const data = fs.readFileSync(f.file, 'utf8');
        if (data.includes('function App') && data.includes('micro')) {
            console.log(`\n!!! Found App code with 'micro' in ${f.file} sz:${f.stat.size} mod:${new Date(f.stat.mtimeMs).toISOString()}`);
            fs.writeFileSync(`found_micro_app_${f.stat.mtimeMs}.jsx`, data);
            c++;
        }
        if (c >= 3) break;
    } catch (e) { }
}

if (c === 0) {
    console.log("No App code with 'micro' found in recent history.");
}
