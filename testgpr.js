const fs = require('fs');
const html = fs.readFileSync('gpr.html', 'utf8');

const sIdx = html.indexOf('id="__NEXT_DATA__" type="application/json">');
if (sIdx !== -1) {
    const dataStart = sIdx + 42;
    const endIdx = html.indexOf('</script>', dataStart);
    const jsonStr = html.substring(dataStart, endIdx);
    console.log('Got NEXT DATA! length:', jsonStr.length);
    const data = JSON.parse(jsonStr);
    const state = data.props?.pageProps?.apolloState;
    if (state) {
        console.log('Apollo State size:', Object.keys(state).length);
        const queryKey = Object.keys(state).find(k => k.startsWith('ROOT_QUERY'));
        if (queryKey && state[queryKey].teamGPR) {
            console.log('Found GPR!', state[queryKey].teamGPR.length);
            const ref = state[queryKey].teamGPR[0].__ref;
            console.log('First team:', state[ref]);
        } else {
            console.log('queryKey?', queryKey, state[queryKey]);
        }
    }
} else {
    console.log('NEXT_DATA not found');
}

const apolloIdx = html.indexOf('ApolloSSRDataTransport');
if (apolloIdx !== -1) {
    const pStart = html.indexOf(').push(', apolloIdx);
    if (pStart !== -1) {
        const dStart = pStart + 7;
        const eIdx = html.indexOf(')</script>', dStart);
        const jsonStr = html.substring(dStart, eIdx);
        console.log('Found ApolloSSR', jsonStr.length, jsonStr.substring(0, 50));
        
        try {
            const parsed = JSON.parse(jsonStr);
            const state = parsed[0]?.rehydrate || parsed[1]?.rehydrate || parsed;
            const rk = Object.keys(state).find(k => state[k]?.data?.teamGPR);
            if(rk) console.log('Parsed ApolloSSR team count', state[rk].data.teamGPR.length);
            else {
                console.log('No teamGPR in ApolloSSR root keys:', Object.keys(state).slice(0, 10));
            }
        } catch(e) { console.error('Parse err:', e.message); }
    }
}
