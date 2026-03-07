const axios = require('axios');
const cheerio = require('cheerio');

async function run() {
    const res = await axios.get('https://www.leagueofgraphs.com/champions/builds/evelynn', { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const $ = cheerio.load(res.data);

    // Attempt to locate Starting Build, Core Build, Boots, Final Item Options
    // Since League Of Graphs might be translated, we search by standard html structure.
    // They are usually in the middle column box.
    const itemsBoxes = $('.requireTooltip').toArray().map(el => $(el).attr('tooltip'));

    // Instead of doing fuzzy matching, we can look for the titles directly.
    const sections = ['Starting Build', 'Core Build', 'Boots', 'Final Item Options'];
    // In FR: Objets de Départ, Build Principal, Options Bottes, Options Finales ?
    // But we are requesting EN by default unless localized URL, wait, domain is en by default if not specified.

    // The image has a specific box layout, let's grab all titles inside the columns.
    $('.titleAndDescription .title').each((i, el) => {
        console.log($(el).text().trim());
    });

    const results = {};
    $('.box').each((i, box) => {
        const title = $(box).find('.box-title').text().trim();
        // The ones we want do NOT have box-title necessarily, they might just be headers in a grid.
        $(box).find('div[style*="font-weight"]').each((j, el) => {
            console.log("Found inner text:", $(el).text().trim());
        });
    });
}
run();
