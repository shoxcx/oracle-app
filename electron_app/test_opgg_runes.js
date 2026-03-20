// Get OP.GG html and parse with cheerio or just regex
const fs = require('fs');
fetch('https://op.gg/champions/shen/build/top').then(r=>r.text()).then(html => {
    // Let's find Next JS script tag instead of playing with DOM
    const nextf = html.match(/<script>\(\s*self\.__next_f.*?\)(.*?)<\/script>/g);
    fs.writeFileSync('shen_opgg_app.html', html);
    console.log("Written HTML to shen_opgg_app.html");
});
