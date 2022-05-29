const { Element } = require('./elements')
const _ = require('lodash')
const anime = require('animejs')
const { isNumber } = require('lodash')
const obs = require('../../utils/observer')
const { measureSync, measureNew } = require('./powerUtils')
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

  refresh(null, true)

  const _return = Element({
    elementHtml: box,
    id,
    animate,
    move_animate_to,
  })

  function animate() {
    const elemRect = powerElement.getRect()

    let { width } = elemRect

    // let { width } = powerElement.get_props()
    anime({
      targets: box,
      width: {
        value: [0, width + op.padding * 2],
        duration: 300,
      },
      // delay: 100,
      endDelay: 800,
      easing: 'easeInOutQuart',
      begin: () => {
        // const path = require('path')
        // const filePath = path.join(__dirname, '../../audios/pen-fast.wav')
        // sound.play(filePath)
      },
    })
    return _return
  }

  function move_animate_to(newPowerElement, op = {}) {
    powerElement = newPowerElement

    let { left, width, height, top } = newPowerElement.get_props()
    const highLight = op.height ? true : false

    op.color = op.color || 'rgba(0, 200, 0, 0.5)'
    op.padding = isNumber(op.padding) ? op.padding : 10
    op.paddingY = isNumber(op.paddingY) ? op.paddingY * 0.5 : 0
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
        value: [prevHeight, op.height + op.paddingY * 2],

        // duration: 200,
      },
      top: {
        value: [prevTop, highLight ? top + height : top - op.paddingY],
        // easing: 'spring(1, 80, 10, 0)',
      },
      easing: 'easeInOutCubic',
      duration: 300,
      opacity: 1,
      begin: () => {
        console.log('begin - move_animate_to')
      },
    })
    return _return
  }

  return _return
}

module.exports = {
  Line,
}
