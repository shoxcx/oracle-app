const fs = require('fs');
fetch('https://op.gg/champions/ahri/build/mid', { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }).then(r=>r.text()).then(html=>{
    fs.writeFileSync('opgg_data.html', html);
    console.log('done writing to opgg_data.html');
});
