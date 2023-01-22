const fs = require('fs')
const joinPath = require('path').join

const name = 'perna-longa'

const text = fs.readFileSync(joinPath(__dirname, `./${name}.txt`), 'utf8')

const newText = text.replace(/[^\s!.;?,|]+/g, '{$&}')

fs.writeFileSync(joinPath(__dirname, `./${name}-script.txt`), newText)

console.log(newText)
