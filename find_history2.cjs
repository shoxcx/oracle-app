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
                if (stat.mtimeMs >= new Date('2026-02-28T14:00:00+01:00').getTime() &&
                    stat.mtimeMs <= new Date('2026-02-28T15:00:00+01:00').getTime()) {
                    results.push({ file: full, stat });
                }
            }
        });
    } catch (e) { }
    return results;
}

const found = walkDir(historyDir);
console.log(`Found ${found.length} files modified between 14:00 and 15:00`);

// If we found any that look like entries.json or actual backups, print them!
found.forEach(f => {
    if (f.file.endsWith('entries.json')) return; // skip printing entries list
    // try to see if it contains App code
    try {
        const content = fs.readFileSync(f.file, 'utf8');
        if (content.includes('function App') || content.includes('React')) {
            console.log(`\n!!! Found App code in ${f.file} sz:${f.stat.size} modified: ${new Date(f.stat.mtimeMs).toISOString()}`);
            // Copy it over as a restored backup!
            fs.writeFileSync(`found_app_${f.stat.mtimeMs}.jsx`, content);
            console.log(`-> Saved as found_app_${f.stat.mtimeMs}.jsx`);
        }
    } catch (e) { }
});
