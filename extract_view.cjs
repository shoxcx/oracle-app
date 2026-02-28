const fs = require('fs');

const file = 'c:\\Users\\User\\.gemini\\antigravity\\conversations\\59154b21-ec14-4d0d-9ff1-05862179d853.pb';
const data = fs.readFileSync(file, 'utf8');

// The view_file output format:
// The following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>. Please note that any changes targeting the original code should remove the line number, colon, and leading space.
// 1: ...
// 2: ...

console.log("Read length:", data.length);
const marker = 'The following code has been modified to include a line number before every line';
let idx = data.lastIndexOf(marker);
if (idx !== -1) {
    let endIdx = data.indexOf('The above content shows the entire, complete file contents', idx);
    if (endIdx === -1) endIdx = data.length;

    let block = data.substring(idx + marker.length, endIdx);
    // It might be JSON escaped with \n and \".
    // Let's unescape if it is.
    // Actually, we can just split by line and see if they match \d+: 
    let lines = block.split(/\\n|\n/);
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
        // maybe try another?
        console.log("Not enough lines extracted.");
    }
} else {
    console.log("Marker not found in utf8.");
}
