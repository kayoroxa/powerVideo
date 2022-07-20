const { Element } = require('./elements')
const _ = require('lodash')
const anime = require('animejs')
const { isNumber, isArray } = require('lodash')
const Group = require('./Group')
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
  let group = false
  const { box, id } = createBox()

  // delete update event when change
  // obs('update').on(powerElement.id, () => refresh(), id)

  op.color = op.color || 'rgba(0, 200, 0, 0.5)'
  op.padding = isNumber(op.padding) ? op.padding : 10
  op.paddingY = isNumber(op.paddingY) ? op.paddingY * 0.5 : 0
  op.radius = isNumber(op.radius) ? op.radius : 5

  const init = { left: 0, top: 0, height: 0, width: 0 }

  const zIndex =
    op?.zIndex ||
    powerElement?.htmlElem.zIndex ||
    powerElement?.htmlElem.parentNode?.zIndex ||
    0

  const getZIndex = () =>
    op?.zIndex ||
    powerElement?.htmlElem.zIndex ||
    powerElement?.htmlElem.parentNode?.zIndex ||
    0

  function initPosition() {
    let { left, top, height } = powerElement ? powerElement.getRect() : init

    const highLight = op.height ? true : false

    anime.set(box, {
      top: `${highLight ? top + height : top - op.paddingY}px`,
      left: `${left - op.padding}px`,
      width: 0,
      height: op.height
        ? `${op.height + op.paddingY * 2}px`
        : `${height + op.paddingY * 2}px`,
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
    scratch,
    link_to: powerElement => {
      powerElement.onChange(() => {
        initPosition()
      })
    },
    close,
  })

  function animate() {
    let { width } = powerElement ? powerElement.getRect() : init

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

  async function move_animate_to(newPowerElement, op = {}, delay = 0) {
    let rect
    if (isArray(newPowerElement)) {
      if (!group) {
        group = Group(...newPowerElement)
        rect = group.htmlElem.getBoundingClientRect()
      } else {
        group.refresh_to(...newPowerElement)
        rect = group.htmlElem.getBoundingClientRect()
      }
    } else {
      rect = newPowerElement.htmlElem.getBoundingClientRect()
    }

    let { left, width, height, top } = rect
    const highLight = op.height ? true : false

    op.color = op.color || 'rgba(0, 200, 0, 0.5)'
    op.padding = isNumber(op.padding) ? op.padding : 10
    op.paddingY = isNumber(op.paddingY) ? op.paddingY * 0.5 : 0
    op.radius = isNumber(op.radius) ? op.radius : 5
    op.height = isNumber(op.height) ? op.height : height
    op.zIndex = op.zIndex || getZIndex() - 1

    anime({
      targets: box,
      delay: delay,
      background: op.color,
      left: left - op.padding,
      width: width + op.padding * 2,
      borderRadius: `${op.radius}px`,
      zIndex: op.zIndex,
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

  async function scratch(newPowerElement, op = {}, delay = 0) {
    let rect
    if (isArray(newPowerElement)) {
      if (!group) {
        group = Group(...newPowerElement)
        rect = group.htmlElem.getBoundingClientRect()
      } else {
        group.refresh_to(...newPowerElement)
        rect = group.htmlElem.getBoundingClientRect()
      }
    } else {
      rect = newPowerElement.htmlElem.getBoundingClientRect()
    }

    let { left, width, height, top } = rect
    const highLight = op.height ? true : false

    op.color = op.color || 'rgba(0, 200, 0, 0.5)'
    op.padding = isNumber(op.padding) ? op.padding : 10
    op.paddingY = isNumber(op.paddingY) ? op.paddingY * 0.5 : 0
    op.radius = isNumber(op.radius) ? op.radius : 5
    op.height = isNumber(op.height) ? op.height : height
    op.zIndex = op.zIndex || getZIndex() - 1

    anime.set(box, {
      left: left - op.padding,
      borderRadius: `${op.radius}px`,
      zIndex: op.zIndex,
      height: op.height + op.paddingY * 2,
      top: highLight ? top + height : top - op.paddingY,
      background: op.color,
    })

    anime({
      targets: box,
      delay: delay,
      width: [0, width + op.padding * 2],
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
