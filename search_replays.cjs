const fs = require('fs');
const content = fs.readFileSync('src/App.jsx', 'utf8');
const lines = content.split('\n');
const res = [];
lines.forEach((l, i) => {
    if (l.includes('function ReplaysView')) {
        res.push((i + 1) + ': ' + l.trim());
    }
});
fs.writeFileSync('tmp_query_replays.txt', res.join('\n'));
