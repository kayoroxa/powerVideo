const Group = require('../utils/api/Group')
const { Text3 } = require('../utils/api/Text3')
const anime = require('animejs')
const { morphText } = require('../utils/api/powerUtils')

module.exports = async ({ Scene, Line }) => {
  const myText2 = Text3('{Hello} {words} {man}').set_x_y({
    x: 'center',
    y: 300,
  })

  const myText3 = Text3('{Hello} {cabeça} {man}').set_x_y({
    x: 'center',
    y: 400,
  })

  const myText4 = Text3('{cabeça} {man} {Hello}').set_x_y({
    x: 'center',
    y: 100,
  })

  myText2.show()
  myText3.show()

  const myLine = Line(myText2.children[1], { padding: 8 })
  Scene.show(myLine.animate())

  const myLine2 = Line(myText3.children[0], {
    padding: 8,
    color: 'hsl(12, 76%, 61%) ',
  })
  Scene.show(myLine2.animate())

  await Scene.playClick(() => {
    myLine.move_animate_to(myText2.children[0], {
      padding: 0,
      color: '#ffff',
      height: 10,
    })
    myLine2.move_animate_to(myText3.children[1], {
      padding: 0,
      color: 'hsl(197, 37%, 24%)',
      height: 10,
    })
  })

  const group1 = Group(myText2, myText3)

  await Scene.playClick(() => {
    group1.set_x_y({
      x: 0,
      y: 0,
    })
  })

  await Scene.playClick(() => {
    group1.set_x_y({
      y: 400,
      x: 300,
    })
  })

  await Scene.delay(() => {
    myLine.move_animate_to(group1, {
      padding: 30,
      paddingY: 60,
      color: '#ffff',
      // height: 10,
    })
  }, 30)

  await Scene.playClick(() => {
    anime({
      targets: [myText3.elementHtml.children, myText2.elementHtml.children],
      color: 'hsl(100, 100%, 99%)',
      duration: 200,
      easing: 'easeInOutQuart',
    })
    myLine.move_animate_to(group1, {
      padding: 30,
      paddingY: 60,
      color: '#ffff',
      // height: 10,
    })
    myLine2.move_animate_to(myText2.children[1], {
      padding: 0,
      color: 'hsl(197, 37%, 24%)',
      height: 10,
    })
  })

  await Scene.playClick(() => {
    morphText(myText2, myText4)

    myLine2.move_animate_to(
      myText4,
      {
        padding: 30,
        paddingY: 30,
        color: 'hsl(359, 100%, 70%)',
        // height: 10,
      },
      100
    )
    myLine.move_animate_to(myText3, {
      padding: 30,
      paddingY: 30,
      // height: 10,
    })
  })
}
