const fs = require('fs');
const zlib = require('zlib');
const pbPath = 'c:\\Users\\User\\.gemini\\antigravity\\conversations\\59154b21-ec14-4d0d-9ff1-05862179d853.pb';
const data = fs.readFileSync(pbPath);
console.log('first bytes:', data.slice(0, 10).toString('hex'));

try {
    const unzipped = zlib.unzipSync(data);
    fs.writeFileSync('pb_unzipped.bin', unzipped);
    console.log('Unzipped successfully, size:', unzipped.length);
} catch (e) {
    console.log('Not zip/gzip/deflate:', e.message);
}
