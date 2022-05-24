module.exports = async ({ Text2, Scene }) => {
  const myText = Text2('what_are_you doing').set_x_y({ x: 100, y: 100 })

  Scene.show(myText)

  const myText2 = Text2('ola').next_to(myText, 'right', 20)

  Scene.show(myText2)
}
