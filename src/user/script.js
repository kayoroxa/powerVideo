// const Elements = require('../utils/Elemento')
// const { Text } = require('../utils/api/elements')
const { Scene } = require('../utils/api/powerUtils')
const { Text2 } = require('../utils/api/Text2')

module.exports = async () => {
  const myText = Text2('hello world').set_x_y({ x: 100, y: 100 })

  const myText2 = Text2(['Hello', 'caio']) //.next_to(myText, 'bottom')
  // const myText4 = Text2(['Hello World', ' caio asdasdasd'])
  // const myText1 = Text2(['Hello World', ' caio asdasdasd'])
  console.log(myText2)
  Scene.show(myText)
  // Scene.show(myText2)

  await Scene.playClick(() => {
    myText.changeText('Hello', 'Oi')
  })

  // await Scene.playClick(() => morphText(myText, myText2))
  // await Scene.playClick(() => {
  //   myText.transform_to(myText2)
  // })
  // // await Scene.playClick(() => {
  // //   myText.children[0].setContent('caio rocha')
  // // })
  // await Scene.playClick(FadeIn(myText4))
  // await Scene.playClick(() => {
  //   myText4.transform_to(myText)
  // })
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
