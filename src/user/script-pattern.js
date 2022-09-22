const { Scene } = require('../utils/api/powerUtils')
const { Text3 } = require('../utils/api/Text3')
const anime = require('animejs')

const colors = {
  line: '#7dd4fc',
  text: 'hsl(218, 23%, 21%)',
  text2: 'hsl(347, 83%, 60%)',
  background: '#ffffff', //'#e8f1f2',
  S: 'hsl(284, 79%, 24%)',
}

const colors2 = [
  'hsl(28, 83%, 61%)',
  'hsl(198, 100%, 46%)',
  'hsl(355, 87%, 66%)',
  'hsl(176, 56%, 55%)',
  'hsl(325, 84%, 47%)',
  'hsl(89, 47%, 40%)',
  'hsl(352, 93%, 53%)',
  'hsl(162, 70%, 34%)',
]

const fontSize = 90
const fontSizeAlternatives = 60

let lastPositionIsBottom = true

module.exports = async () => {
  // Scene.setBackground(colors.background)

  const scripts = [
    ['her', 'him'],
    ['house', 'aeroport', 'home'],
    ['yesterday', 'last year'],
    ['joão', 'jerry'],
  ]

  const frase = Text3(`on {my} {back}`)
    .setStyle({
      fontSize: fontSize + 'px',
      lineHeight: '0 !important',
      color: colors.text,
    })
    .set_x_y('center')

  frase.show()

  for (const [index, fraseChild] of frase.children.entries()) {
    const wordsX = scripts[index].map((w, i) =>
      Text3(w)
        .setStyle({
          fontSize: fontSizeAlternatives + 'px',
          lineHeight: '0 !important',
          color: colors2[index],
        })
        .next_to(fraseChild, lastPositionIsBottom ? 'bottom' : 'top', i * 80)
    )

    for (let word of wordsX) {
      await Scene.playClick()

      fraseChild.elementHtml.classList.add('stroke')

      // frase
      anime({
        targets: fraseChild.elementHtml,
        color: colors2[index],
        easing: 'linear',
        duration: 200,
      })

      //alternativas

      anime({
        targets: word.elementHtml,
        translateY: [lastPositionIsBottom ? 600 : -600, 0],
        easing: 'easeOutExpo',
      })

      word.show()
    }

    lastPositionIsBottom = !lastPositionIsBottom
  }
}
