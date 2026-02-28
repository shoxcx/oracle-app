const fs = require('fs');
const data = fs.readFileSync('c:\\Users\\User\\.gemini\\antigravity\\conversations\\fb3a7fd3-6d3a-487b-a8d4-46b496e16924.pb', 'utf8');
console.log('Successfully read file, length:', data.length);
const matches = data.match(/```(?:jsx|js|javascript)?[\s\S]*?```/g);
if(matches) {
    console.log('Found blocks:', matches.length);
    fs.writeFileSync('extracted_blocks.txt', matches.join('\n\n---\n\n'), 'utf8');
} else {
    console.log('No blocks');
}
