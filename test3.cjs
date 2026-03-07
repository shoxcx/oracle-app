const fs = require('fs');
const html = fs.readFileSync('gpr.html', 'utf8');

const sIdx = html.indexOf('id="__NEXT_DATA__"');
if (sIdx !== -1) {
    const dataStart = html.indexOf('>', sIdx) + 1;
    const endIdx = html.indexOf('</script>', dataStart);
    const jsonStr = html.substring(dataStart, endIdx);
    const data = JSON.parse(jsonStr);
    const state = data.props?.pageProps?.apolloState || data.props?.pageProps?.initialApolloState;
    if (state) {
        let teams = null;
        for (const k of Object.keys(state)) {
             if (state[k] && state[k].teamGPR) {
                  teams = state[k].teamGPR;
                  break;
             }
        }
        if (teams) {
             console.log('Found teams length:', teams.length);
             const firstData = state[teams[0].__ref];
             console.log('first team:', firstData.team);
        } else {
             console.log('No teamGPR found in state keys');
        }
    } else {
       console.log('no state');
       console.log(Object.keys(data.props.pageProps));
    }
}
