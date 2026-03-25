fetch('https://www.op.gg/champions/xinzhao/build/mid', { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }}).then(v=>v.text()).then(html=>{
    const matches = [...html.matchAll(/<img[^>]*src="([^"]*(?:perk|stat)[^"]*png(?:[^"]+)?)"/gi)];
    for(let m of matches) {
        console.log(m[1].split('?')[0]);
    }
});

