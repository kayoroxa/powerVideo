const { Element } = require('./elements')
const _ = require('lodash')
const { Scene } = require('./powerUtils')
const { isNumber } = require('lodash')
const anime = require('animejs')
const bug = require('../bug')

function createBox() {
  const box = document.createElement('div')
  let id = false
  box.classList.add('p-group')
  box.classList.add('p-absolute')
  id = _.uniqueId('box_group_')
  box.id = id

  return { box, id }
}

function refreshStyle(powerElements, box, id) {
  const childrenProps = powerElements.map(powerElement => {
    const childRect = powerElement.getRect()

    return {
      left: childRect.left,
      top: childRect.top,
      width: childRect.width,
      height: childRect.height,
      right: childRect.left + childRect.width,
      bottom: childRect.top + childRect.height,
    }
  })

  const childrenPropsMaxY = _.maxBy(childrenProps, 'bottom')
  const childrenPropsMinY = _.minBy(childrenProps, 'top')

  const childrenPropsMaxX = _.maxBy(childrenProps, 'right')
  const childrenPropsMinX = _.minBy(childrenProps, 'left')

  box.style.width = `${childrenPropsMaxX.right - childrenPropsMinX.left}px`
  box.style.height = `${childrenPropsMaxY.bottom - childrenPropsMinY.top}px`
  box.style.top = `${childrenPropsMinY.top}px`
  box.style.left = `${childrenPropsMinX.left}px`
  box.style.position = 'absolute'
  // box.style.background = 'hsl(344, 100%, 54%)'
  box.style.zIndex = -5

  return { box, id }
}

function set_x_y(elementHtml, children, op) {
  let x = null
  let y = null

  if (typeof op === 'string') {
    if (op === 'center') {
      x = 'center'
      y = 'center'
    }
  }

  if (x === 'center') {
    x = window.innerWidth / 2 - elementHtml.offsetWidth / 2
  }
  if (y === 'center') {
    y = window.innerHeight / 2 - elementHtml.getBoundingClientRect().height / 2
  }

  const timeline = anime.timeline({
    // easing: 'easeOutExpo',
    duration: 500,
  })

  timeline.add(
    {
      targets: [elementHtml, ...children.map(child => child.htmlElem)],
      translateY: isNumber(y) ? y - elementHtml.offsetTop : null,
      translateX: isNumber(x) ? x - elementHtml.offsetLeft : null,
    },
    0
  )
}

module.exports = (...powerElements) => {
  const { box, id } = createBox()

  refreshStyle(powerElements, box, id)

  const children = powerElements

  const me = Element({
    elementHtml: box,
    id,
    children,
    set_x_y: op => {
      set_x_y(box, children, op)
    },
    refresh_to: (...powerElements) => {
      refreshStyle(powerElements, box, id)
    },
    getRect: () => {
      const rect = box.getBoundingClientRect()
      bug(rect.left > 0, 'box: childrenRect[index] > 0')
      return rect
    },
  })

  Scene.show(me)

  return me
}
