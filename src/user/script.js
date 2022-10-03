/* eslint-disable */
const req = require('../utils/ts')

// const changeText = require('./script-changeText') //bug
// const changeMultiText = require('./script-changeMultiText') //bug
// const nextTo = require('./script-nextTo') //bug
// const textSize = require('./script-textSize') //bug
// const traduçãoParcelada = require('./tradução-parcelada') //bug

// const lineAndSublinhar = require('./script-sublinhar')
// const line = require('./bible')
// const lineWalking = require('./script-audio-texto-video')
// const textMorph = require('./script-text-morph')
// const morphLetters = require('./script-morph-letters')
// const pronounce = require('./script-pronounce')
// const muchacha = require('./script-muchacha')
// const readHtml = require('./script-readHtml')
// const lyricsHighlight = require('./script-lyrics-highlight')
// const pattern = require('./script-pattern')
// const wordsSounds = require('./script-words-sounds')
// const blocksSubtitle = require('./script-style-if')
// const cursoFree = require('./curso-free')
// const quiz = req('./script-quiz')

require('./script-cursor-magic')

const fs = require('fs')

async function main(params) {
  const app = document.querySelector('.app')
  const files = fs
    .readdirSync(__dirname)
    .filter(v => !v.includes('.') || v.endsWith('.js'))
  // .map(v => (!v.includes('.') ? v + '/index.js' : v))

  const filesElement = document.createElement('div')
  filesElement.classList.add('files')

  const elements = files.map(v => {
    const p = document.createElement('p')
    p.textContent = v.replace('.js', '').replace('script-', '')
    p.classList.add('file')
    p.addEventListener('click', () => {
      app.innerHTML = ''
      require('./' + v)(params)
    })
    return p
  })
  filesElement.append(...elements)
  app.append(filesElement)
}
module.exports = main
