module.exports = async ({ Text2, Scene, Line }) => {
  const myText2 = Text2(['você ', 'tem', ' ', 'feito']).set_x_y({
    x: 400,
    y: 300,
  })
  const myText3 = Text2(['have you', ' ', 'ever']).set_x_y({
    x: 400,
    y: 400,
  })

  Scene.show(myText2)
  Scene.show(myText3)

  const myLine = Line(myText2.children[3], { padding: 8 })
  Scene.show(myLine.animate())

  const myLine2 = Line(myText3.children[0], {
    padding: 8,
    color: 'hsl(12, 76%, 61%) ',
  })
  Scene.show(myLine2.animate())

  await Scene.playClick(() => {
    myLine.move_animate_to(myText2.children[1], {
      padding: 0,
      color: '#ffff',
      height: 10,
    })
    myLine2.move_animate_to(myText3.children[0], {
      padding: 0,
      color: 'hsl(197, 37%, 24%)',
      height: 10,
    })
  })
  await Scene.playClick(() => {
    myLine.move_animate_to(myText2, {
      padding: 0,
      color: '#ffff',
      height: 10,
    })
  })
  await Scene.playClick(() => {
    myLine.move_animate_to(myText3.children[2], {
      padding: 8,
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
    myLine.move_animate_to(myText2.children[1], {
      padding: 8,
      color: '#ff1453',
    })
    console.log(myText2.children[1])
    myText2.children[1].htmlElem.style.color = '#ffff'
  })
}
