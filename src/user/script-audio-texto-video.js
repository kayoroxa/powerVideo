const Group = require('../utils/api/Group')
const { Text3 } = require('../utils/api/Text3')
const anime = require('animejs')
const { morphText } = require('../utils/api/powerUtils')

const titleStyle = {
  fontSize: '90px',
  color: '#fff',
  textShadow:
    '2px 0 0 #003357, -2px 0 0 #003357, 0 2px 0 #003357, 0 -2px 0 #003357, 1px 1px #003357, -1px -1px 0 #003357, 1px -1px 0 #003357, -1px 1px 0 #003357',
}

module.exports = async ({ Scene, Line }) => {
  const title = Text3('O que fazer?').setStyle(titleStyle).set_x_y({
    x: 'center',
    y: 100,
  })

  const texts = [
    Text3('1. Continua escutando'),
    Text3('2. Quando tiver tempo olha a tradução'),
    Text3('3. Ainda não entendeu, assista a aula'),
  ]

  title.show()

  texts.forEach((text, index) =>
    text.set_x_y({
      x: 'center',
      y: 260 + index * 100,
    })
  )
  texts.forEach(text => text.show())

  const myLine = Line(title, { padding: 8, zIndex: '-50' })

  Scene.show(myLine.animate())

  await Scene.playClicks(
    texts.map((text, index) => () => {
      myLine.move_animate_to(texts.slice(0, index + 1), {
        padding: 30,
        paddingY: 30,
        color: 'hsl(197, 98%, 100%)',
      })
    })
  )
}
