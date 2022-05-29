const { Text3 } = require('../utils/api/Text3')

module.exports = async ({ Scene, Line }) => {
  const myText2 = Text3('{Hello} {words} {man}').set_x_y({
    x: 'center',
    y: 300,
  })

  const myText3 = Text3('{Hello} {words} {man}').set_x_y({
    x: 'center',
    y: 400,
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
  // await Scene.playClick(() => {
  //   myLine.move_animate_to(myText2, {
  //     padding: 0,
  //     color: '#ffff',
  //     height: 10,
  //   })
  // })

  // const group1 = Group(myText2, myText3)

  // await Scene.playClick(() => {
  //   myLine.move_animate_to(group1, {
  //     padding: 30,
  //     paddingY: 60,
  //     color: '#ffff',
  //     // height: 10,
  //   })
  //   myLine2.move_animate_to(myText2.children[1], {
  //     padding: 0,
  //     color: 'hsl(197, 37%, 24%)',
  //     height: 10,
  //   })
  // })
  // await Scene.playClick(() => {
  //   myLine.move_animate_to(myText2.children[1], {
  //     padding: 8,
  //     color: '#ff1453',
  //   })
  //   console.log(myText2.children[1])
  //   myText2.children[1].htmlElem.style.color = '#ffff'
  // })
}
