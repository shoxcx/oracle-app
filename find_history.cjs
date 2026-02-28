const fs = require('fs');
const path = require('path');

const historyDir = 'C:\\Users\\User\\AppData\\Roaming\\Code\\User\\History';
let found = [];

function searchDir(dir) {
    try {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                searchDir(fullPath);
            } else if (file === 'entries.json') {
                const content = fs.readFileSync(fullPath, 'utf8');
                if (content.includes('lol-tracker') && content.includes('App.jsx')) {
                    found.push({ path: fullPath, content, time: stat.mtimeMs });
                }
            }
        }
    } catch (e) { }
}

searchDir(historyDir);

console.log(`Found ${found.length} entries files.`);

found.forEach(f => {
    const dir = path.dirname(f.path);
    console.log(`\nDirectory: ${dir} (Last modified: ${new Date(f.time).toISOString()})`);
    try {
        const data = JSON.parse(f.content);
        if (data.entries) {
            data.entries.forEach(entry => {
                if (entry.id) {
                    const entryFile = path.join(dir, entry.id);
                    if (fs.existsSync(entryFile)) {
                        const stat = fs.statSync(entryFile);
                        // Read a bit
                        const entryContent = fs.readFileSync(entryFile, 'utf8').substring(0, 100).replace(/\n/g, ' ');
                        console.log(`  - Entry ${entry.id} @ ${new Date(entry.timestamp || stat.mtimeMs).toISOString()} size:${stat.size} type:${typeof entryContent}: ${entryContent}`);
                    }
                }
            });
        }
    } catch (e) {
        console.error("Error parsing", f.path);
    }
});
