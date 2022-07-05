const fs = require('fs')
const joinPath = require('path').join

const text = fs.readFileSync(joinPath(__dirname, './raw-script.txt'), 'utf8')

const newText = text.replace(/[^\s!.;?,|]+/g, '{$&}')

fs.writeFileSync(joinPath(__dirname, './script.txt'), newText)

console.log(newText)
