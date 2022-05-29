const { distributeOnScreen } = require('../utils/api/powerUtils')
const { Text3 } = require('../utils/api/Text3')

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

  const texts = [Text3('1'), Text3('2'), Text3('3')]

  title.show()

  distributeOnScreen(texts, { align: 'row', gap: 100 })

  texts.forEach(text => text.show())

  const myLine = Line(title, { padding: 8, zIndex: '-50' })

  Scene.show(myLine.animate())

  await Scene.playClicks(
    texts.map((_, index) => () => {
      myLine.move_animate_to(texts.slice(0, index + 1), {
        padding: 30,
        paddingY: 30,
        color: 'hsl(197, 98%, 100%)',
      })
    })
  )
}
