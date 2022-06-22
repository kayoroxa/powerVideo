const Group = require('../utils/api/Group')
const { morphText } = require('../utils/api/powerUtils')
const { Text3 } = require('../utils/api/Text3')

module.exports = async ({ Scene, Line }) => {
  const text = Text3('{v}oc{ê} tem s fe{ito} cad{ui}').set_x_y({
    x: 'center',
    y: 200,
  })
  const text2 = Text3('{v}oc{ê} {ui} fe{ito}').set_x_y({
    x: 'center',
    y: 500,
  })
  const text3 = Text3('Sou um texto').set_x_y({
    x: 'center',
    y: 300,
  })

  const group1 = Group(text3, text2)

  const line = Line(group1, { padding: 30 })

  Scene.show(text)
  Scene.show(text3)

  await Scene.playClick(() => morphText(text, text2))

  Scene.show(line.animate())

  await Scene.playClick(() => line.move_animate_to(text3, { padding: 0 }))
}
