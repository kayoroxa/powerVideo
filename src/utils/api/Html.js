const { Element } = require('./elements')
const _ = require('lodash')
const anime = require('animejs')
const { addOnApp } = require('./powerUtils')
// const sound = require('sound-play')

function createBox(htmlString) {
  const box = document.createElement('div')
  let id = false
  box.classList.add('p-html')
  box.classList.add('p-absolute')
  id = _.uniqueId('box_html_')
  box.id = id

  box.innerHTML = htmlString

  return { box, id }
}

module.exports = html => {
  const { box, id } = createBox(html)
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
