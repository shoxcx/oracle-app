const fs = require('fs');
const html = fs.readFileSync('log.html', 'utf8');
const rows = html.split('<tr');
console.log('Total rows:', rows.length);

let count = 0;
for (const row of rows) {
    if (row.includes('kills') && row.includes('deaths') && count < 2) {
        console.log('ROW:', row.substring(6000, 9000));
        count++;
    }
}
