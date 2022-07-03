const { Enfase, sleep, space } = require('../utils/api/powerUtils')

module.exports = async ({ Text2, Scene, Line }) => {
  const myText1 = Text2(space(['você', 'tem', 'feito']))
    .box_style({
      // minWidth: '600px',
      // justifyContent: 'center',
    })
    .set_x_y({
      x: 'center',
      y: 'center',
    })

  const myText3 = Text2(space(['have you', 'ever'])).set_x_y({
    x: 'center',
    y: 450,
  })

  Scene.show(myText1)
  Scene.show(myText3)

  const line1 = Line(myText1.children[1], { padding: 0 })

  Scene.show(line1.animate())

  const enfase = Enfase(myText1.children, '30px', '60px')

  await Scene.playClicks([
    //
    () => {
      line1.move_animate_to(myText1.children[2])
      // enfase.select(0)

      myText1.children[0].style.color = '#ff0000'
    },
    () => enfase.select(1),
    () => enfase.select(0),
  ])

  await sleep(600)

  // const line1 = Line(myText1.children[1], { padding: 0 })

  // await Scene.playClick(() => {
  //   Scene.show(line1.animate())
  // })
}
