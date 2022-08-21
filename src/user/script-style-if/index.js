const { MainCena } = require('./cena')
const { scriptParse } = require('./funcs')
const fs = require('fs')
const { Line } = require('../../utils/api/line')
const { Scene } = require('../../utils/api/powerUtils')
const joinPath = require('path').join

let indexCena = 0
const { isSubtitle } = require('./config')
const obs = require('../../utils/observer')

const cena = MainCena({ Scene, Line, isSubtitle })

function loadScript() {
  let myTexts

  function getTxt() {
    try {
      const filePath = joinPath(__dirname, './script.txt')
      const hasFile = fs.existsSync(filePath)
      if (hasFile) {
        return fs.readFileSync(filePath, { encoding: 'utf8' })
      } else {
        const allFiles = fs.readdirSync(joinPath(__dirname, './'))
        const filePath = allFiles.find(v => v[0] === '-')
        return fs.readFileSync(joinPath(__dirname, filePath), {
          encoding: 'utf8',
        })
      }
    } catch (error) {
      console.log('script.txt not found')
    }
  }

  function load() {
    const myScript = getTxt()

    myTexts = scriptParse(myScript, isSubtitle)
  }

  // function loop() {
  //   setInterval(() => {
  //     const currentTxt = getTxt()
  //     if (lastTxt !== currentTxt) load()
  //   }, 5000)
  // }

  // loop()

  load()

  return {
    get texts() {
      return myTexts
    },
    reload: load,
  }
}

let canKeyClick = true

obs('KEY').on('priority', p => {
  if (p === false) canKeyClick = true
  else canKeyClick = false
})

module.exports = async () => {
  const myScript = loadScript()

  Scene.setBackground('#021ff4')

  document.addEventListener('keydown', async e => {
    if (!canKeyClick) return
    // arrow left
    async function putCena(indexCena) {
      document.querySelector('.app').innerHTML = ''
      myScript.reload()
      const teach = myScript.texts[indexCena]
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
    }

    if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
      indexCena = Math.max(indexCena - 1, 0)
      putCena(indexCena)
    }
    if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
      indexCena = Math.min(indexCena + 1, myScript.texts.length - 1)
      putCena(indexCena)
    }
    if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') {
      putCena(indexCena)
    }
  })

  // for (const [index, teach] of myScript.texts.entries()) {
  //   indexCena = index
  //   if (teach[0].includes('|')) {
  //     await cena(
  //       teach.map(v => v.split('|')[0].trim()),
  //       ['center', 120]
  //     )
  //     await cena(
  //       teach.map(v => v.split('|')[1].trim()),
  //       440
  //     )
  //   } else {
  //     await cena(teach)
  //   }
  //   await Scene.playClick(() => (document.querySelector('.app').innerHTML = ''))
  // }
}
