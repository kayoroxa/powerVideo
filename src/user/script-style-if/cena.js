const { Text3 } = require('../../utils/api/Text3')
const { resetText, sortByIndex } = require('./funcs')
const anime = require('animejs')
const Group = require('../../utils/api/Group')
const { myLine, mySublinhado, myText } = require('./elements')
const { Scene, sleep } = require('../../utils/api/powerUtils')
const { isArray } = require('lodash')

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
  if (isArray(top)) top = top[0]
  const text1 = myText(myTexts[0].replace(/=[^}]+|\d+/g, ''), top)
  // const text1Clone = myText(myTexts[0].replace(/=[^}]+/g, ''), top)

  const text2 = Text3(myTexts[1].replace(/\d+/g, ''))
    .setStyle(titleStyle)
    .next_to(text1, 'bottom', 20)

  const keysPt = myTexts[1].match(/(?<=\{).+?(?=\})/g)

  const indexSorted = sortByIndex(keysPt)

  text2.children = text2.children.map((_, index) => {
    debugger
    return text2.children[indexSorted[index]]
  })

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
  // Scene.show(text1Clone)
  Scene.show(text2)

  // if want show all colors previously
  // resetText(text2, false, { shuffle: true })
  // resetText(text1, false, { shuffle: true })

  Scene.show(line.animate())
  Scene.show(sublinhado.animate())

  return {
    text1,
    // text1Clone,
    text2,
    line,
    sublinhado,
    group,
  }
}

async function cena({ Scene }, myTexts, top) {
  const { text1, text2, sublinhado, group, line } = createElements(myTexts, top)

  for (const [index] of text2.children.entries()) {
    await Scene.key()

    resetText(text1.children.slice(0, index + 1), false, index)

    await sleep(50)

    resetText(text2.children.slice(0, index + 1), false, index)

    anime({
      targets: text2.children[index].elementHtml,
      translateY: [600, 0],
      duration: 200,
      easing: 'spring(1, 80, 15, 0)',
    })

    anime({
      targets: [
        text1.children[index].elementHtml,
        // text1Clone.children[index].elementHtml,
      ],
      duration: 500,
      easing: 'spring(1, 80, 15, 0)',
    })
  }

  await Scene.key()

  sublinhado.setStyle({ height: '0px' }, 'easeInQuad')
  resetText(text2, 'hsl(222, 19%, 27%)', 'all')
  resetText(text1, 'hsl(12, 83%, 62%)', 'all')
  // resetText(text1Clone, 'hsl(12, 83%, 62%)', 'all')

  if (isArray(top)) {
    await Scene.key()
    group.set_x_y({
      x: 'center',
      y: 100,
    })
    line.set_x_y({
      x: 'center',
      y: 50,
    })
  }
}

module.exports = {
  MainCena,
}
