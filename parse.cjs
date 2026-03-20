async function testOPGGExtraction() {
  const html = require('fs').readFileSync('opgg_data.html', 'utf8');
  
  // Extract perkStyle (Primary and Secondary Tree)
  const stylesMatches = Array.from(html.matchAll(/perkStyle\\?\/(\d+)/g));
  const styles = [...new Set(stylesMatches.map(m => m[1]))];
  
  // Extract perks (Runes)
  // OPGG puts images for all runes, but the ACTIVE ones are colored, inactive are grayscale...
  // Usually the HTML might contain 'grayscale' class or similar for unselected ones.
  // Actually, OP.GG renders the Top Build row. Let's extract the raw IDs first.
  const perkMatches = Array.from(html.matchAll(/perk\\?\/(\d+)/g));
  const activePerks = [...new Set(perkMatches.map(m => m[1]))];

  console.log("Styles:", styles.slice(0, 5));
  console.log("Perks:", activePerks.slice(0, 20));
}

testOPGGExtraction();
