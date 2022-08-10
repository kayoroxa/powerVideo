const { Element } = require('./elements')
const _ = require('lodash')
const anime = require('animejs')
const { addOnApp } = require('./powerUtils')
// const sound = require('sound-play')

function createBox(url) {
  const box = document.createElement('div')
  let id = false
  box.classList.add('p-box-img')
  box.classList.add('p-absolute')
  id = _.uniqueId('box_img_')
  box.id = id

  const imgHtml = document.createElement('img')
  imgHtml.src = url

  box.appendChild(imgHtml)

  return { box, id }
}

const Img = url => {
  const { box, id } = createBox(url)
  box.classList.add('hide')
  box.style.justifyContent = 'center'
  box.classList.add('anchor-center')

  addOnApp(box)

  function close(anim = 'width') {
    anime({
      targets: box,
      width: anim === 'width' && 0,
      height: (anim === 'height' || anim === 'translateX') && 0,
      opacity: anim === 'opacity' && 0,
      translateX: anim === 'right' && '300%',
      easing: 'easeInOutQuart',
    })
    return _return
  }

  const _return = Element({
    elementHtml: box,
    close,
    id,
    anime: animation => {
      if (!animation) return _return
      box.classList.remove('hide')
      anime({
        targets: box,
        ...animation,
      })
    },
    setStyle: style => {
      Object.keys(style).forEach(key => {
        box.style[key] = style[key]
      })
      return _return
    },
    show: () => {
      box.classList.remove('hide')
    },
    getRect: () => {
      const rect = box.getBoundingClientRect()
      return rect
    },
  })

  return _return
}
module.exports = Img
