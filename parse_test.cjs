const parser = require('@babel/parser');
const fs = require('fs');
try {
    parser.parse(fs.readFileSync('src/App.jsx', 'utf8'), {
        sourceType: 'module',
        plugins: ['jsx']
    });
    console.log('Parse successful!');
} catch (e) {
    console.error(e);
}
