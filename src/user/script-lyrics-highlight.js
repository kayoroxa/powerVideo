const { Scene, sleep } = require('../utils/api/powerUtils')
const { Text3 } = require('../utils/api/Text3')
const anime = require('animejs')
const { Line } = require('../utils/api/line')

module.exports = async () => {
  const textContents = [
    //
    '{--Kawaii} {is} {a fascinating} {idea} {to} {me}',
    "{It's a very...} {--vulnerable} {**kind of cute.}",
  ]

  for (let textContent of textContents) {
    await animate1Sentence(textContent)
  }
}

async function animate1Sentence(textContent) {
  Scene.setBackground('#021ff4')

  // const textWithKeys = textContent
  //   .split(' ')
  //   .map(v => `{${v}}`)
  //   .join(' ')

  const text = Text3(textContent)
    .setStyle({
      color: '#ffffff',
      overflow: 'hidden',
    })
    .set_x_y('center')

  text.children.forEach(wordsPower => {
    anime.set(wordsPower.htmlElem, {
      opacity: 0,
    })
  })

  text.show()

  const line = Line(false, { zIndex: -1000, color: '#ef8152' })
  Scene.show(line.animate())

  for (let wordPower of text.children) {
    if (!wordPower.textRaw.includes('**')) await sleep(600)

    if (wordPower.textRaw.includes('--')) {
      line.scratch(wordPower, {
        padding: 7,
        color: '#ef8152',
      })
    }

    anime({
      targets: wordPower.htmlElem,
      translateY: ['200px', '0px'],
      opacity: 1,
      duration: 1000,
      easing: 'easeOutExpo',
    })
  }
  await sleep(1500)
  document.querySelector('.app').innerHTML = ''
}
