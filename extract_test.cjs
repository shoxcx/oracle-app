const fs = require('fs');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync('test2.html', 'utf-8');
const dom = new JSDOM(html);
const document = dom.window.document;

const data = (() => {
    const clean = t => t ? t.textContent.trim() : "";
    let winRate = "50%";
    const wrEl = document.querySelector('#graphDD2');
    if (wrEl) winRate = clean(wrEl);

    // Parse Items
    const results = { starting: [], core: [], boots: [], fourth: [], fifth: [], sixth: [] };
    const sectionNames = ["Objets de départ", "Objets principaux", "Bottes", "Objets de fin"]; // In French
    const englishNames = ["Starting items", "Core items", "Boots", "End items"]; // Just in case

    // They are often in a box with a title
    const headers = Array.from(document.querySelectorAll('.box-title'));

    let allItemsRaw = [];
    headers.forEach(h => {
        const title = clean(h);
        if (sectionNames.includes(title) || englishNames.includes(title)) {
            const container = h.parentElement.parentElement; // usually .box
            if (container) {
                // Some are in rows with popularities, we want the most popular (first) row
                const firstRow = container.querySelector('.itemRows tr') || container.querySelector('.row') || container;
                const imgs = Array.from(firstRow.querySelectorAll('img[src*="/img/items/"]'));
                const ids = imgs.map(img => {
                    const src = img.getAttribute('src');
                    const m = src.match(/items\\/([\\d\\.] +) \\/\\d+\\/(\\d +) \\.png /);
                    if (m) return parseInt(m[2]);
                    const m2 = src.match(/\\/(\\d +) \\.png /);
                    if (m2) return parseInt(m2[1]);
                    return null;
                }).filter(id => id && id > 1000);

                if (title.includes('départ') || title.includes('Starting')) results.starting = ids;
                else if (title.includes('principaux') || title.includes('Core')) results.core = ids;
                else if (title.includes('Bottes') || title.includes('Boots')) results.boots = ids;
                else if (title.includes('fin') || title.includes('End')) {
                    if (ids.length >= 1) results.fourth.push({ id: ids[0], winRate: "55%" });
                    if (ids.length >= 2) results.fifth.push({ id: ids[1], winRate: "55%" });
                    if (ids.length >= 3) results.sixth.push({ id: ids[2], winRate: "55%" });
                }

                // Backup
                allItemsRaw = allItemsRaw.concat(ids);
            }
        }
    });

    // Runes
    let runes = { primary: "8100", secondary: "8200", active: [] };
    const runeImgs = Array.from(document.querySelectorAll('img[src*="/img/perks/"]'));
    if (runeImgs.length > 0) {
        runes.active = runeImgs.map(img => {
            const src = img.getAttribute('src');
            const m = src.match(/\\/(\\d +) \\.png /);
            return m ? m[1] : null;
        }).filter(Boolean);
    }

    // Setup Primary / Secondary from active (guess or use default, UI only cares about active mostly except keystones)
    if (runes.active.length > 0) {
        // Find the first big rune (keystone) container if possible, but LOG doesn't give style IDs easily
    }

    // Skills
    let skillOrder = [];
    const skillRows = Array.from(document.querySelectorAll('.skillsOrderTable tr'));
    // Usually rows have the letter Q, W, E, R in the first column, and blocks for levels
    skillRows.forEach(row => {
        const charEl = row.querySelector('.skill');
        if (charEl) {
            const char = clean(charEl);
            // find which levels have a div.active
            const cells = row.querySelectorAll('td');
            cells.forEach((cell, idx) => {
                if (cell.querySelector('.upd')) { // .upd is usually the blue/white up arrow box
                    skillOrder[idx - 1] = char; // -1 because first cell is the letter
                }
            });
        }
    });
    // Filter empty
    skillOrder = skillOrder.filter(Boolean);
    if (skillOrder.length < 3) skillOrder = ["Q", "W", "E"];

    // Spells
    let spells = [];
    const spellImgs = Array.from(document.querySelectorAll('img[src*="/img/spells/"]')).slice(0, 2);
    spells = spellImgs.map(img => {
        const m = img.getAttribute('src').match(/\\/(\\d +) \\.png /);
        return m ? m[1] : null;
    }).filter(Boolean);

    return { winRate, results, runes, skillOrder, spells, allItemsRaw };
})();

console.log(JSON.stringify(data, null, 2));
