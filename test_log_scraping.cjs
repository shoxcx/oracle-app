const puppeteer = require('puppeteer');

async function scrapeHeader(url) {
    console.log(`Testing URL: ${url}`);
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // Mimic real user agent to avoid bot detection
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.setViewport({ width: 1920, height: 1080 });

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });

        // Wait a bit
        await new Promise(r => setTimeout(r, 3000));

        const data = await page.evaluate(() => {
            const wrEl = document.querySelector('#graphDD2') || document.querySelector('.pie-chart-wrapper .percentage');
            // Try to find items using the selector from scraper.cjs
            const itemImages = Array.from(document.querySelectorAll('img'));
            const candidates = [];

            itemImages.forEach(img => {
                const src = img.src || "";
                const m = src.match(/\/(\d+)\.png/); // Fixed regex escape for JS string
                if (m) {
                    const id = parseInt(m[1]);
                    if (id > 1000) candidates.push(id);
                }
            });
            const uniqueItems = [...new Set(candidates)].slice(0, 6);

            return {
                title: document.title,
                winRate: wrEl ? wrEl.innerText.trim() : "Not found",
                items: uniqueItems
            };
        });

        console.log('Scraped Data:', data);

    } catch (e) {
        console.error('Error:', e.message);
    } finally {
        await browser.close();
    }
}

// Test with valid slug
const c1 = "akali";
const c2 = "sylas";
const role = "mid"; // mid
const url = `https://www.leagueofgraphs.com/champions/builds/${c1}/vs-${c2}/${role}`;

scrapeHeader(url);
