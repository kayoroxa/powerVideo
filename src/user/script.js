// const Elements = require('../utils/Elemento')
const { Text } = require('../utils/api/elements')
const { Scene, FadeIn } = require('../utils/api/powerUtils')

module.exports = async () => {
  const myText = Text(['Hello World', ' caio']).set_x_y({ x: 100, y: 100 })
  const myText2 = Text(['Hello World', ' caio rocha']).next_to(myText, 'top')
  const myText4 = Text(['Hello World', ' caio asdasdasd'])

  Scene.show(myText)

  await Scene.playClick(FadeIn(myText2))
  await Scene.playClick(() => {})
  await Scene.playClick(() => {
    myText.children[0].setContent('caio rocha')
  })
  await Scene.playClick(FadeIn(myText4))
}

// module.exports = [
//   () => {
//     Elements('p1').changeContent('hi').changeStyle({
//       left: '50px',
//       top: '50px',
//     })
//     Elements('p2')
//       .changeContent('olá caio')
//       // .changeStyle({
//       //   link: 'p1',
//       //   right: '100px',
//       //   bottom: '100px',
//       // })
//       .link('p1')
//   },

//   () => {
//     Elements('p1').changeStyle({
//       left: '0px',
//       top: '100px',
//     })
//     // Elements('p2').changeContent('beijo').changeStyle({
//     //   right: '200px',
//     //   bottom: '200px',
//     //   backgroundColor: 'orange',
//     // })
//   },
//   () => {
//     Elements('p1').changeStyle(
//       {
//         top: '200px',
//       },
//       true
//     )
//   },
// ]
