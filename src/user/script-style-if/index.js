const { MainCena } = require('./cena')
const { scriptParse } = require('./funcs')
const fs = require('fs')
const joinPath = require('path').join

module.exports = async ({ Scene, Line }) => {
  const filePath = joinPath(__dirname, './script.txt')
  const myScript = fs.readFileSync(filePath, { encoding: 'utf8' })

  const myTexts = scriptParse(myScript)

  const cena = MainCena({ Scene, Line })
  Scene.setBackground('#021ff4')

  for (let teach of myTexts) {
    if (teach[0].includes('|')) {
      await cena(
        teach.map(v => v.split('|')[0].trim()),
        ['center', 120]
      )
      await cena(
        teach.map(v => v.split('|')[1].trim()),
        440
      )
    } else {
      await cena(teach)
    }

    await Scene.playClick(() => (document.querySelector('.app').innerHTML = ''))
  }
}
