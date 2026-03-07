const fs = require('fs');

const appFile = 'src/App.jsx';
let content = fs.readFileSync(appFile, 'utf8');

const b64Data = fs.readFileSync('b64.txt', 'utf8'); // contains 'wbg': 'data:...', \n 'tsw': 'data:...'

// Replace 'wbg': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/81/Weibo_Gaminglogo_square.png',
// with the base64 data and add tsw right after it.

const toReplace = `'wbg': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/81/Weibo_Gaminglogo_square.png',`;
let updatedContent = content;

if (content.includes(toReplace)) {
    updatedContent = content.replace(toReplace, b64Data + ',');
    fs.writeFileSync(appFile, updatedContent, 'utf8');
    console.log('App.jsx successfully patched with base64 images for WBG and TSW.');
} else {
    console.log('Could not find the target string to replace in App.jsx. Let me search for wbg:');
    const wbgRegex = /'wbg':\s*'.*?',/g;
    const match = content.match(wbgRegex);
    if (match) {
        updatedContent = content.replace(match[0], b64Data + ',');
        fs.writeFileSync(appFile, updatedContent, 'utf8');
        console.log('App.jsx successfully patched with base64 images using regex.');
    } else {
        console.error('wbg not found in logoMap at all.');
    }
}
