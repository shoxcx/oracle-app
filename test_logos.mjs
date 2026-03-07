import fs from 'fs';

async function downloadLogo(slug, title) {
  try {
    const apiRes = await fetch(`https://lol.fandom.com/api.php?action=query&titles=File:${title}&prop=imageinfo&iiprop=url&format=json`, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const apiData = await apiRes.json();
    const pages = apiData.query.pages;
    const pageId = Object.keys(pages)[0];
    const url = pages[pageId].imageinfo[0].url;
    console.log(`${slug} resolved to: ${url}`);

    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return `'${slug}': 'data:image/png;base64,${buffer.toString('base64')}'`;
  } catch (e) {
    console.error(`Failed ${slug}:`, e.message);
    return null;
  }
}

async function main() {
  const result = [];
  const res1 = await downloadLogo('wbg', 'Weibo_Gaminglogo_square.png');
  if (res1) result.push(res1);
  const res2 = await downloadLogo('tsw', 'Team_Secret_Whaleslogo_square.png');
  if (res2) result.push(res2);
  
  fs.writeFileSync('b64.txt', result.join(',\n'));
  console.log("Done. File created.");
}

main();
