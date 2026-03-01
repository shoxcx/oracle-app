const fs = require('fs');
const content = fs.readFileSync('src/App.jsx', 'utf8');
const lines = content.split('\n');
const res = [];
lines.forEach((l, i) => {
    if (l.includes('function App') || l.includes('function LiveView') || l.includes('activeTab ===') || l.includes('Analyse')) {
        res.push((i + 1) + ': ' + l.trim().substring(0, 100));
    }
});
fs.writeFileSync('tmp_query.txt', res.join('\n'));
