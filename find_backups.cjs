const fs = require('fs');

const file = 'c:\\Users\\User\\.gemini\\antigravity\\conversations\\59154b21-ec14-4d0d-9ff1-05862179d853.pb';
const data = fs.readFileSync(file, 'latin1');

let targetFiles = [];
// Find all occurrences of "TargetFile":"..." or "TargetFile": "..."
const regex = /"TargetFile"\s*:\s*"([^"]+)"/g;
let match;
while ((match = regex.exec(data)) !== null) {
    targetFiles.push(match[1]);
}

console.log("Files edited/created in the 14h50 conversation:");
const uniqueFiles = [...new Set(targetFiles)];
uniqueFiles.forEach(f => console.log(f));
