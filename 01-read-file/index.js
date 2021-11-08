const fs = require('fs');
const path = require('path');

const pathFile = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(pathFile, 'utf-8');

let data = '';
readableStream.on('data', chunk => data += chunk);
readableStream.on('end', () => console.log(data));
