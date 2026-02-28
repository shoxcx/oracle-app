const fs = require('fs');
const pbPath = 'c:\\Users\\User\\.gemini\\antigravity\\conversations\\59154b21-ec14-4d0d-9ff1-05862179d853.pb';
const data = fs.readFileSync(pbPath);

// Find all printable string sequences of at least 50 characters
let strings = [];
let currentString = '';

for (let i = 0; i < data.length; i++) {
    const byte = data[i];
    if (
        (byte >= 32 && byte <= 126) ||
        byte === 10 || byte === 13 || byte === 9
    ) {
        currentString += String.fromCharCode(byte);
    } else {
        if (currentString.length >= 50) {
            strings.push(currentString);
        }
        currentString = '';
    }
}
if (currentString.length >= 50) strings.push(currentString);

fs.writeFileSync('pb_strings_all.txt', strings.join('\n\n====SEPARATOR====\n\n'), 'utf8');
console.log('Extracted strings:', strings.length);
