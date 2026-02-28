const fs = require('fs');

const file = 'c:\\Users\\User\\.gemini\\antigravity\\conversations\\59154b21-ec14-4d0d-9ff1-05862179d853.pb';
const data = fs.readFileSync(file, 'latin1');

console.log("Read length:", data.length);
// Try to find the word 'The following code has been modified'
let idx = data.lastIndexOf('The following code has been modified');
if (idx !== -1) {
    let endIdx = data.indexOf('The above content shows the entire, complete file contents', idx);
    if (endIdx === -1) endIdx = data.length;

    let block = data.substring(idx, endIdx);
    // Unescape JSON newlines etc if it's in JSON
    block = block.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');

    let lines = block.split('\n');
    console.log("Lines found:", lines.length);

    let resultLines = [];
    for (let l of lines) {
        let m = l.match(/^\s*(\d+):\s(.*)$/);
        if (m) {
            resultLines.push(m[2]);
        }
    }

    console.log("Extracted lines:", resultLines.length);
    if (resultLines.length > 100) {
        fs.writeFileSync('extracted_app_from_view.jsx', resultLines.join('\n'));
        console.log("Saved extracted_app_from_view.jsx");
    } else {
        console.log("Not enough lines extracted.");
    }
} else {
    console.log("Marker not found in latin1.");
}
