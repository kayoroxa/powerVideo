module.exports = async ({ Text2, Scene, Line, changeTextTo }) => {
  const myText = Text2(['this ', 'text', ' will change']).set_x_y({
    x: 100,
    y: 100,
  })
  Scene.show(myText)

  await Scene.playClick(() => {
    changeTextTo(myText.children[1], 'sentence', {
      color: '#f4fbf5',
      // backgroundColor: 'rgb(5, 104, 143)',
    })
  })
  await Scene.playClick(() => {
    const myLine = Line(myText.refresh().children[1], { padding: 10 })
    Scene.show(myLine.animate())
  })

  console.log(myText.refresh())
}
