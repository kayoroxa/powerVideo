const Group = require('../utils/api/Group')
const { Text3 } = require('../utils/api/Text3')
// const anime = require('animejs')
// const { morphText, sleep } = require('../utils/api/powerUtils')
// const _ = require('lodash')
const anime = require('animejs')

const titleStyle = {
  fontSize: '50px',
  color: 'hsl(212, 14%, 19%)',
  textShadow:
    '2px 0 0 #003357, -2px 0 0 #003357, 0 2px 0 #003357, 0 -2px 0 #003357, 1px 1px #003357, -1px -1px 0 #003357, 1px -1px 0 #003357, -1px 1px 0 #003357',
}

// function splitTexts(texts) {
//   return texts.map(text => text.replace(/[^?,.!\s]+/g, '{$&}'))
// }

module.exports = async ({ Scene, Line }) => {
  const myScript = `
    {I'll} {handle this}, {guys}, OK?
    {Eu vou} {cuidar disso}, {pessoal}, OK?

    {Listen}, {buddy}. {Come here}.
    {Ouça}, {amigo}. {Venha aqui}.

    {We} {got} {a} {tiny}, {little} | {itsybitsy} {problem} {here}, OK?
    {Nós} {temos} {um} {pequeno}, {pequeno} | {pequenino} {problema} {aqui}, Ok?

    {I'd love} {to hang out} {with} {you}
    {Eu adoraria} {sair} {com} {você}
  `

  const myTexts = myScript.split('\n\n').map(v =>
    v
      .split('\n')
      .map(v => v.trim())
      .filter(v => v.length > 0)
  )

  for (let teach of myTexts) {
    if (teach[0].includes('|')) {
      await cena(
        Scene,
        Line,
        teach.map(v => v.split('|')[0].trim()),
        120
      )
      await cena(
        Scene,
        Line,
        teach.map(v => v.split('|')[1].trim()),
        440
      )
    } else {
      await cena(Scene, Line, teach)
    }

    await Scene.playClick(() => (document.querySelector('.app').innerHTML = ''))
  }
}

async function cena(Scene, Line, myTexts, top) {
  const text1 = Text3(myTexts[0])
    .setStyle(titleStyle)
    .set_x_y({
      x: 'center',
      y: top || 400,
    })

  const text2 = Text3(myTexts[1])
    .setStyle(titleStyle)
    .next_to(text1, 'bottom', 20)

  // const text3 = Text3("{I'll}").set_x_y({
  //   x: 'center',
  //   y: 200,
  // })

  const group = Group(text1, text2)

  const minLength = myTexts.reduce(
    (acc, text) => (acc < text.length ? text.length : acc),
    0
  )

  const line = Line(group, {
    padding: minLength < 16 ? 200 : 50,
    paddingY: 100,
    color: 'white',
    radius: 30,
  })

  const sublinhado = Line(text2, {
    padding: 0,
    color: 'hsl(218, 23%, 21%)',
    height: 7,
  })

  anime.set(
    text2.children.map(v => v.elementHtml),
    {
      translateY: 600,
    }
  )

  Scene.show(text1)
  Scene.show(text2)

  // await Scene.playClick(() => {
  //   morphText(text1.children[0], text3)
  // })

  resetText(text2)
  resetText(text1)

  Scene.show(line.animate())
  Scene.show(sublinhado.animate())

  await Scene.playClicks(
    text2.children.map((children, index) => () => {
      resetText(text2, false, index)
      resetText(text1, false, index)
      anime({
        targets: children.elementHtml,
        // color: 'hsl(100, 100%, 99%)',
        translateY: [600, 0],
        duration: 200,
        easing: 'spring(1, 80, 15, 0)',
      })

      anime({
        targets: text1.children[index].elementHtml,
        // color: 'hsl(100, 100%, 99%)',
        duration: 500,
        easing: 'spring(1, 80, 15, 0)',
      })
    })
  )

  await Scene.playClick(() => {
    resetText(text2, 'hsl(12, 83%, 62%)')
    resetText(text1, 'hsl(12, 83%, 62%)')
  })
}

function resetText(textComp, color) {
  const colors = [
    'hsl(352, 93%, 53%)',
    'hsl(198, 100%, 46%)',
    'hsl(89, 47%, 40%)',
    'hsl(197, 93%, 29%)',
    'hsl(328, 38%, 37%)',
    'hsl(162, 70%, 34%)',
    'hsl(28, 83%, 61%)',
  ]
  textComp.children.forEach((child, index) => {
    anime({
      targets: child.elementHtml,
      color: color ? color : colors[index] || 'hsl(12, 83%, 62%)',
    })
  })
}
