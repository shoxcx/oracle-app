const fs = require('fs');
const pbPath = 'c:\\Users\\User\\.gemini\\antigravity\\conversations\\59154b21-ec14-4d0d-9ff1-05862179d853.pb';
const data = fs.readFileSync(pbPath, 'latin1');
// Extract all strings with typical printable characters length >= 2000
const strings = data.match(/[\x20-\x7E\xA0-\xFF\n\r\t]{2000,}/g) || [];
console.log(`Found ${strings.length} long text blocks.`);
strings.forEach((s, i) => {
    let clean = s.replace(/\s+/g, ' ').substring(0, 80);
    console.log(`[Block ${i}] (len:${s.length}) = ${clean}`);
});

// Since the file is just text mixed with binary, we can just save it to text 
fs.writeFileSync('pb_strings.txt', strings.join('\n\n---BLOCK---\n\n'), 'latin1');
