const Group = require('../utils/api/Group')
const { Text3 } = require('../utils/api/Text3')
const anime = require('animejs')
const { morphText } = require('../utils/api/powerUtils')

module.exports = async ({ Scene, Line }) => {
  const texto = Text3(
    '{did they get you} to trade {hot air} for a cool'
  ).set_x_y({
    x: 'center',
    y: 300,
  })

  const myText3 = Text3('rórér')
  myText3.next_to(texto.children[0], 'top')

  texto.show()
  myText3.show()

  const myLine = Line(texto.children[0], { padding: 8 })
  Scene.show(myLine.animate())

  await Scene.playClick(() => {
    myLine.move_animate_to(myText3, {
      padding: texto.children[0].getRect().width / 2 - myText3.getRect().width,
    })
  })
}
