const { Text3 } = require('../../utils/api/Text3')
const { resetText } = require('./funcs')
const anime = require('animejs')
const Group = require('../../utils/api/Group')
const { myLine, mySublinhado, myText } = require('./elements')
const { Scene } = require('../../utils/api/powerUtils')

function MainCena(op) {
  return (...params) => cena(op, ...params)
}

const titleStyle = {
  fontSize: '50px',
  color: 'hsl(212, 14%, 19%)',
  textShadow:
    '2px 0 0 #011628, -2px 0 0 #011628, 0 2px 0 #011628, 0 -2px 0 #011628, 1px 1px #011628, -1px -1px 0 #011628, 1px -1px 0 #011628, -1px 1px 0 #011628',
}

function createElements(myTexts, top) {
  const text1 = myText(myTexts[0].replace(/=[^}]+/g, ''), top)
  const text1Clone = myText(myTexts[0].replace(/=[^}]+/g, ''), top)

  const text2 = Text3(myTexts[1])
    .setStyle(titleStyle)
    .next_to(text1, 'bottom', 20)

  const group = Group(text1, text2)

  const minLength = myTexts.reduce(
    (acc, text) => (acc < text.length ? text.length : acc),
    0
  )

  const line = myLine(group, minLength)
  const sublinhado = mySublinhado(text2)

  anime.set(
    text2.children.map(v => v.elementHtml),
    {
      translateY: 600,
    }
  )

  Scene.show(text1)
  Scene.show(text1Clone)
  Scene.show(text2)

  // await Scene.playClick(() => {
  //   morphText(text1.children[0], text3)
  // })

  resetText(text2)
  resetText(text1)
  resetText(text1Clone)

  Scene.show(line.animate())
  Scene.show(sublinhado.animate())

  return {
    text1,
    text1Clone,
    text2,
    line,
    sublinhado,
  }
}

async function cena({ Scene }, myTexts, top) {
  // if (myTexts[0]) {
  // const tex = Text3('I Will')
  //   .setStyle({ ...titleStyle, color: 'white' })
  //   .next_to(text1.children[0], 'top', 20)

  // Scene.show(tex)

  const { text1, text1Clone, text2, sublinhado } = createElements(myTexts, top)

  await Scene.playClicks(
    text2.children.map((children, index) => () => {
      const texts = [text1Clone, text2, text1]

      texts.forEach(text => resetText(text, false, index))

      anime({
        targets: children.elementHtml,
        // color: 'hsl(100, 100%, 99%)',
        translateY: [600, 0],
        duration: 200,
        easing: 'spring(1, 80, 15, 0)',
      })

      // morphText(text1Clone, tex)

      anime({
        targets: [
          text1.children[index].elementHtml,
          text1Clone.children[index].elementHtml,
        ],
        // color: 'hsl(100, 100%, 99%)',
        duration: 500,
        easing: 'spring(1, 80, 15, 0)',
      })
    })
  )

  await Scene.playClick(() => {
    sublinhado.anime_out()
    resetText(text2, 'hsl(12, 83%, 62%)')
    resetText(text1, 'hsl(12, 83%, 62%)')
    resetText(text1Clone, 'hsl(12, 83%, 62%)')
  })
}

module.exports = {
  MainCena,
}
