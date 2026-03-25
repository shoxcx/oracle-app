const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.op.gg/champions/xinzhao/build/mid', { waitUntil: 'networkidle2' });
    const r = await page.evaluate(() => {
        const all = Array.from(document.querySelectorAll('img[src*=\"/perk\"], img[src*=\"/stat\"]'));
        return all.filter(img => {
            const s = window.getComputedStyle(img);
            const p = window.getComputedStyle(img.parentElement);
            const pp = window.getComputedStyle(img.parentElement.parentElement);
            return !s.filter.includes('grayscale') && 
                   !p.filter.includes('grayscale') && 
                   !pp.filter.includes('grayscale') &&
                   parseFloat(s.opacity) >= 0.8 && 
                   parseFloat(p.opacity) >= 0.8 &&
                   parseFloat(pp.opacity) >= 0.8;
        }).map(img => img.src);
    });
    console.log(r);
    await browser.close();
})();
