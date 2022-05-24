const { Element } = require('./elements')
const _ = require('lodash')
const anime = require('animejs')
const { isNumber } = require('lodash')

function createBox(type = 'div') {
  const box = document.createElement(type)
  let id = false
  box.classList.add('p-line')
  if (type === 'div') {
    box.classList.add('p-absolute')
    id = _.uniqueId('box_line_')
    box.id = id
  }

  return { box, id }
}

function Line(powerElement, op = {}) {
  const { box, id } = createBox()

  let { left, top, width, height } = powerElement.get_props()

  op.color = op.color || 'rgba(0, 200, 0, 0.5)'
  op.padding = isNumber(op.padding) ? op.padding : 10
  op.radius = isNumber(op.radius) ? op.radius : 5

  const zIndex =
    powerElement.htmlElem.zIndex || powerElement.htmlElem.parentNode.zIndex || 0

  box.style.position = 'absolute'
  box.style.top = `${top}px`
  box.style.left = `${left - op.padding}px`
  box.style.width = `${width + op.padding * 2}px`
  box.style.height = `${height}px`
  box.style.background = op.color
  box.style.zIndex = zIndex - 1
  box.style.borderRadius = `${op.radius}px`

  const _return = Element({
    elementHtml: box,
    id,
    animate,
    move_animate_to,
  })

  function animate() {
    anime({
      targets: box,
      width: [0, width + op.padding * 2],
      duration: 500,
      easing: 'easeInOutQuad',
    })
    return _return
  }

  function move_animate_to(powerElement, op) {
    let { left, width, height, top } = powerElement.get_props()
    const highLight = op.height ? true : false

    op.color = op.color || 'rgba(0, 200, 0, 0.5)'
    op.padding = isNumber(op.padding) ? op.padding : 10
    op.radius = isNumber(op.radius) ? op.radius : 5
    op.height = isNumber(op.height) ? op.height : height

    box.style.background = op.color
    box.style.borderRadius = `${op.radius}px`

    const prevLeft = box.offsetLeft
    const prevTop = box.offsetTop
    const prevHeight = box.offsetHeight
    const prevWidth = box.offsetWidth

    anime({
      targets: box,

      left: [prevLeft, left - op.padding],
      width: [prevWidth, width + op.padding * 2],
      height: {
        value: [prevHeight, op.height],

        // duration: 200,
      },
      top: {
        value: [prevTop, highLight ? top + height : top],
        // easing: 'spring(1, 80, 10, 0)',
      },
      easing: 'easeInOutCubic',
      duration: 300,
      opacity: 1,
    })
    return _return
  }

  return _return
}

module.exports = {
  Line,
}
