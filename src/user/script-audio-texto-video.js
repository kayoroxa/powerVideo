const Group = require('../utils/api/Group')
const { distributeOnScreen } = require('../utils/api/powerUtils')
const { Text3 } = require('../utils/api/Text3')

const titleStyle = {
  fontSize: '90px',
  color: '#fff',
  textShadow:
    '2px 0 0 #003357, -2px 0 0 #003357, 0 2px 0 #003357, 0 -2px 0 #003357, 1px 1px #003357, -1px -1px 0 #003357, 1px -1px 0 #003357, -1px 1px 0 #003357',
}

const splitText = (text, by = ' ') =>
  text
    .split(by)
    .map(v => `{${v}}`)
    .join(by)

module.exports = async ({ Scene, Line }) => {
  const title = Text3('TITLE').setStyle(titleStyle).set_x_y({
    x: 'center',
    y: 100,
  })

  const texts = [
    Text3(' {and when he} {wanted} {to go} {farther} '),
    Text3(' {e quando ele} {queria} {ir} {mais longe} '),
  ].map(v =>
    v.setStyle({
      colorAll: '#e9c46a',
    })
  )

  // const texts = [
  //   Text3(splitText('At noon he rested in a town')),
  //   Text3(splitText('Ao meio-dia ele descansou em uma cidade')),
  // ]

  distributeOnScreen(texts, { direction: 'column', gap: 20 })

  title.show()
  texts.forEach(text => text.show())

  console.log(splitText('At noon he rested in a town'))

  const myLine = Line(texts[0], { padding: 8, zIndex: '-50' })
  const myLine2 = Line(texts[1], { padding: 8, zIndex: '-50' })

  Scene.show(myLine.animate())
  Scene.show(myLine2.animate())

  const group1 = Group(...texts)

  await Scene.playClicks(
    texts[0].children.map((_, index) => () => {
      myLine.move_animate_to(texts[0].children[index], {
        color: 'hsl(359, 100%, 70%)',
      })

      myLine2.move_animate_to(texts[1].children[index], {
        color: 'hsl(346, 84%, 61%)',
      })
    })
  )

  // await Scene.playClick(() => {
  //   myLine.htmlElem.classList.add('hide')
  //   group1.set_x_y({
  //     x: 500,
  //     y: 500,
  //   })
  // })

  // const texts2 = [Text3('{1}'), Text3('2'), Text3('3')]

  // distributeOnScreen(texts2, { direction: 'row', gap: 100 })

  // texts2.forEach(text => text.show())
}
