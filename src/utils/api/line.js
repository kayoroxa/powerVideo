const { Element } = require('./elements')
const _ = require('lodash')
const anime = require('animejs')
const { isNumber } = require('lodash')
const obs = require('../../utils/observer')
// const sound = require('sound-play')

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

  // delete update event when change
  obs('update').on(powerElement.id, () => refresh(), id)

  op.color = op.color || 'rgba(0, 200, 0, 0.5)'
  op.padding = isNumber(op.padding) ? op.padding : 10
  op.paddingY = isNumber(op.paddingY) ? op.paddingY * 0.5 : 0
  op.radius = isNumber(op.radius) ? op.radius : 5
  // debugger
  const zIndex =
    powerElement.htmlElem.zIndex ||
    powerElement.htmlElem.parentNode?.zIndex ||
    0

  async function refresh(rect = false, start) {
    obs('update').remove(id)
    obs('update').on(powerElement.id, () => refresh(), id)

    const elemRect = powerElement.getRect()

    let { left, top, width, height } = rect || elemRect

    box.style.zIndex = zIndex - 1
    // box.style.opacity = 0
    anime({
      targets: box,
      top: [`${top - op.paddingY}px`, `${top - op.paddingY}px`],
      left: [`${left - op.padding}px`, `${left - op.padding}px`],
      width: start
        ? 0
        : [`${width + op.padding * 2}px`, `${width + op.padding * 2}px`],
      height: [
        `${height + op.paddingY * 2}px`,
        `${height + op.paddingY * 2}px`,
      ],
      background: [op.color, op.color],
      borderRadius: `${op.radius}px`,
      // easing: 'linear',
    })
  }

  function initPosition() {
    let { left, top, height } = powerElement.getRect()

    anime.set(box, {
      top: `${top - op.paddingY}px`,
      left: `${left - op.padding}px`,
      width: 0,
      height: `${height + op.paddingY * 2}px`,
      background: op.color,
      borderRadius: `${op.radius}px`,
      zIndex: zIndex - 1,
    })
  }

  initPosition()

  const _return = Element({
    elementHtml: box,
    id,
    animate,
    move_animate_to,
  })

  function animate() {
    let { width } = powerElement.getRect()

    anime({
      targets: box,
      width: {
        value: width + op.padding * 2,
        duration: 300,
      },
      easing: 'easeInOutQuart',
    })
    return _return
  }

  async function move_animate_to(newPowerElement, op = {}, delay = 0) {
    powerElement = newPowerElement

    let { left, width, height, top } = newPowerElement.get_props()
    const highLight = op.height ? true : false

    op.color = op.color || 'rgba(0, 200, 0, 0.5)'
    op.padding = isNumber(op.padding) ? op.padding : 10
    op.paddingY = isNumber(op.paddingY) ? op.paddingY * 0.5 : 0
    op.radius = isNumber(op.radius) ? op.radius : 5
    op.height = isNumber(op.height) ? op.height : height

    anime({
      targets: box,
      delay: delay,
      background: op.color,
      left: left - op.padding,
      width: width + op.padding * 2,
      borderRadius: `${op.radius}px`,
      height: {
        value: op.height + op.paddingY * 2,

        // duration: 200,
      },
      top: {
        value: highLight ? top + height : top - op.paddingY,
        // easing: 'spring(1, 80, 10, 0)',
      },
      easing: 'easeInOutCubic',
      duration: 500,
      opacity: 1,
    })
    return _return
  }

  return _return
}

module.exports = {
  Line,
}
