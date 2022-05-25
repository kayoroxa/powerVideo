const { Enfase, sleep } = require('../utils/api/powerUtils')

module.exports = async ({ Text2, Scene, Line }) => {
  const myText1 = Text2(['você ', 'tem', ' ', 'feito']).set_x_y({
    x: 400,
    y: 300,
  })

  Scene.show(myText1)

  const enfase = Enfase(myText1.children, '60px', '100px')

  await Scene.playClicks([
    //
    () => enfase.select(0),
    () => enfase.select(1),
    () => enfase.select(3),
  ])

  await sleep(600)

  const line1 = Line(myText1.children[1], { padding: 0 })

  await Scene.playClick(() => {
    Scene.show(line1.animate())
  })
}
