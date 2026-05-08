const fs = require('fs');
const txt = fs.readFileSync('./scratch/ugg_apollo_clicked.json', 'utf8');
console.log('Includes lp:', txt.includes('"lp"'));
console.log('Includes timestamp:', txt.includes('"timestamp"'));
const data = JSON.parse(txt);
// Deep search
function search(obj, key) {
    if (!obj || typeof obj !== 'object') return;
    if (Array.isArray(obj)) {
        obj.forEach(i => search(i, key));
    } else {
        for (let k in obj) {
            if (k.toLowerCase().includes(key.toLowerCase())) {
                console.log('Found key:', k, 'Value preview:', JSON.stringify(obj[k]).substring(0, 100));
            }
            search(obj[k], key);
        }
    }
}
search(data, 'lp');
