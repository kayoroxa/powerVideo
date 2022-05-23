const { Scene } = require('../utils/api/powerUtils')
const { Text2 } = require('../utils/api/Text2')

module.exports = async () => {
  const myText = Text2('hello world').set_x_y({ x: 100, y: 100 })

  Scene.show(myText)

  await Scene.playClick(() => {
    myText.changeText('Hello', 'Oi')
  })
}
