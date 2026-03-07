const fs = require('fs');
const html = fs.readFileSync('gpr.html', 'utf-8');
const { JSDOM } = require('jsdom');
// use standard regex
let match = html.match(/window\[Symbol\.for\("ApolloSSRDataTransport"\)\]\s*\?\?\=\s*\[\]\)\.push\((.*?)\)<\/script>/s);
if(match) {
   let raw = match[1];
   try {
     let data = JSON.parse(raw);
     let state = data.rehydrate;
     let rootKey = Object.keys(state)[0];
     let root = state[rootKey];
     let teams = root.data.teamGPR;
     console.log('teams:', teams.length);
     console.log('team 0 details:', teams[0].team.name, teams[0].currentTeamGPR.gprScore, teams[0].teamMatchRecord.wins);
   } catch(e){ console.error(e); }
} else {
   console.log("No match found.");
}
