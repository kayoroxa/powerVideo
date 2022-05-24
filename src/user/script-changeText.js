module.exports = async ({ Text2, Scene }) => {
  const myText = Text2('what_are_you doing').set_x_y({ x: 100, y: 100 })
  Scene.show(myText)

  await Scene.playClick(() => {
    myText.changeText('t_are_you', 'riâh')
  })
}
