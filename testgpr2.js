const { app, BrowserWindow } = require('electron');
app.disableHardwareAcceleration();

app.whenReady().then(async () => {
    try {
       const win = new BrowserWindow({ show: false, webPreferences: { contextIsolation: true, nodeIntegration: false }});
       await win.loadURL('https://lolesports.com/en-GB/gpr/2026/current');
       
       await new Promise(r => setTimeout(r, 6000));
       
       const data = await win.webContents.executeJavaScript(`
           (() => {
                const apolloData = window[Symbol.for('ApolloSSRDataTransport')];
                if (!apolloData) return 'no apollo';
                let stateObj = null;
                if (apolloData && apolloData.length) {
                    stateObj = apolloData.find(d => d.rehydrate)?.rehydrate;
                }
                if (!stateObj) {
                     stateObj = apolloData.find(d => d.data)?.data;
                }
                if (!stateObj) {
                     // check Next.js state
                     const nextDataStr = document.getElementById('__NEXT_DATA__')?.textContent;
                     if(nextDataStr) {
                         const nData = JSON.parse(nextDataStr);
                         stateObj = nData.props?.pageProps?.apolloState || nData.props?.pageProps?.initialApolloState;
                     }
                }
                
                if (!stateObj) return 'no stateObj.';
                
                const rootKeys = Object.keys(stateObj);
                const rootKey = rootKeys.find(k => stateObj[k]?.data?.teamGPR) || rootKeys.find(k => k.startsWith('ROOT_QUERY')) || rootKeys[0];
                const root = stateObj[rootKey];
                const teams = root?.data?.teamGPR || root?.teamGPR;
                
                return { 
                   apolloStateObjKeys: rootKeys.slice(0,5), 
                   teamGPR: !!teams, 
                   teamCount: teams ? teams.length : 0 
                };
           })()
       `);
       console.log('Result:', JSON.stringify(data, null, 2));
    } catch(e) { console.error('error', e); }
    app.exit();
});
