const Img = require('../../utils/api/Img')
const { sleep, Scene } = require('../../utils/api/powerUtils')
const { Text3 } = require('../../utils/api/Text3')
const anime = require('animejs')
const _ = require('lodash')

const myScript = {
  title: 'to {run} away',
  description: 'Escapar de algo ou de alguém',
  img: 'https://st2.depositphotos.com/1005147/5192/i/450/depositphotos_51926417-stock-photo-hands-holding-the-sun-at.jpg',

  exemple: [
    'He ran away from home',
    'Correu para casa',
    'I ran away from the house',
    'Eu fugi da minha casa',
    'Eu asdasdasdasdasd',
    'ahharhreherh',
  ],
}

module.exports = async () => {
  const title = Text3(myScript.title)
    .setStyle({
      color: '#05b0d6',
      fontSize: '100px',
      textShadow: 1,
    })
    .set_x_y({ x: 'center', y: 300 })

  const description = Text3(myScript.description)
    .setStyle({
      color: '#293242',
      fontSize: '50px',
    })
    .next_to(title, 'bottom')

  title.show()
  description.show()

  await Scene.playClick()

  anime({
    targets: [title.elementHtml, description.elementHtml],
    translateY: [0, myScript.img ? -250 : -150],
    easing: 'easeOutQuart',
  })

  let photo

  if (myScript.img) {
    photo = Img(myScript.img)
      .setStyle({
        width: '600px',
        height: '400px',
        borderRadius: '30px',
      })
      .set_x_y({ x: 'center', y: 250 })

    await sleep(500)

    photo.show()
    photo.anime({
      opacity: [0, 1],
      translateX: [-300, 0],
      easing: 'easeOutQuart',
    })
  }

  if (!myScript.exemple) return

  if (photo) {
    await Scene.playClick()
    photo.anime({
      // opacity: [1, 0],
      translateY: [0, 600],

      easing: 'easeOutQuart',
    })

    anime({
      targets: [title.elementHtml, description.elementHtml],
      translateY: -150,
      easing: 'easeOutQuart',
    })
  }

  let en
  let pt

  for (let exemple of _.chunk(myScript.exemple, 2)) {
    //apagar o anterior
    if (en) en.anime({ opacity: [1, 0] })
    if (pt) pt.anime({ opacity: [1, 0] })

    en = Text3(exemple[0])
      .setStyle({
        color: '#293242',
        fontSize: '50px',
      })
      .set_x_y({ x: 'center', y: 350 })

    pt = Text3(exemple[1])
      .setStyle({
        color: '#293242',
        fontSize: '50px',
      })
      .next_to(en, 'bottom')

    await sleep(500)

    en.show()
    en.anime({
      opacity: [0, 1],
      translateX: [300, 0],
      easing: 'easeOutQuart',
    })

    pt.show()
    pt.anime({
      opacity: [0, 1],
      translateX: [-300, 0],
      easing: 'easeOutQuart',
    })

    await Scene.playClick()
  }
}
