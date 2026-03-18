const scraper = require('./scraper.cjs');
const LCU_MOCK = {};
(async () => {
    const build = await scraper.getChampionBuild('Briar', 'jungle');
    console.log(JSON.stringify(build, null, 2));
    process.exit(0);
})();
