const fs = require('fs')
const joinPath = require('path').join

const myFolder = joinPath(__dirname, '../js')

const allFilesInDir = fs.readdirSync(myFolder).filter(v => v !== '_loader.js')

allFilesInDir.forEach(nameFile => {
  require(joinPath(myFolder, nameFile))
})
// console.log(allFilesInDir)
