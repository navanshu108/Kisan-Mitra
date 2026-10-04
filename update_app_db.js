const fs = require('fs');
const schemes = require('./data/demo-schemes/schemes.json');
let appJs = fs.readFileSync('./frontend/js/app.js', 'utf8');

// Find the index of "const stateCropMap ="
const startIndex = appJs.indexOf('const LOCAL_DB = [');
const endIndex = appJs.indexOf('const stateCropMap =');

if (startIndex !== -1 && endIndex !== -1) {
    const before = appJs.substring(0, startIndex);
    const after = appJs.substring(endIndex);
    const newDb = `const LOCAL_DB = ${JSON.stringify(schemes, null, 4)};\n\n`;
    fs.writeFileSync('./frontend/js/app.js', before + newDb + after);
    console.log("Successfully replaced LOCAL_DB");
} else {
    console.log("Could not find boundaries");
}
