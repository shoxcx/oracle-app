const fs = require('fs');

const file = process.argv[2] || 'c:\\Users\\User\\.gemini\\antigravity\\conversations\\229b4707-9b53-40aa-a14c-7979bbd48e52.pb';
const data = fs.readFileSync(file, 'latin1');
console.log('File read, size:', data.length);

const snippets = [];
let re = /"CommandLine"\s*:\s*"([^"]+)"/g;
let match;
while ((match = re.exec(data)) !== null) {
    snippets.push(match[1]);
}
console.log("Commands executed in 229b:", snippets);

let re2 = /"TargetFile"\s*:\s*"([^"]+)"/g;
let files = [];
while ((match = re2.exec(data)) !== null) {
    files.push(match[1]);
}
console.log("Files edited in 229b:", files);

let re3 = /git \w+/g;
let gits = [];
while ((match = re3.exec(data)) !== null) {
    gits.push(match[0]);
}
console.log("Git cmds mentioned:", gits.slice(0, 10));

