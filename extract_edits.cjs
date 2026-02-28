const fs = require('fs');
const file = 'c:\\Users\\User\\.gemini\\antigravity\\conversations\\59154b21-ec14-4d0d-9ff1-05862179d853.pb';
const data = fs.readFileSync(file, 'utf8');

// Find all occurrences of "ReplacementContent"\s*:\s*"(.*?)"
let regex = /"ReplacementContent"\s*:\s*"((?:\\.|[^"\\])*)"/g;
let match;
let replacements = [];
while ((match = regex.exec(data)) !== null) {
    replacements.push(match[1]);
}
console.log(`Found ${replacements.length} ReplacementContent strings`);

let regex2 = /"TargetContent"\s*:\s*"((?:\\.|[^"\\])*)"/g;
let targets = [];
while ((match = regex2.exec(data)) !== null) {
    targets.push(match[1]);
}
console.log(`Found ${targets.length} TargetContent strings`);

let regex3 = /"CodeContent"\s*:\s*"((?:\\.|[^"\\])*)"/g;
let codes = [];
while ((match = regex3.exec(data)) !== null) {
    codes.push(match[1]);
}
console.log(`Found ${codes.length} CodeContent strings`);

if (replacements.length > 0) {
    fs.writeFileSync('pb_replacements.json', JSON.stringify({ replacements, targets }, null, 2), 'utf8');
}
if (codes.length > 0) {
    fs.writeFileSync('pb_codes.json', JSON.stringify({ codes }, null, 2), 'utf8');
}
