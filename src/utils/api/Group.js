const { Element } = require('./elements')
const _ = require('lodash')
const { Scene } = require('./powerUtils')

function createBox(type = 'div') {
  const box = document.createElement(type)
  let id = false
  box.classList.add('p-text')
  if (type === 'div') {
    box.classList.add('p-absolute')
    id = _.uniqueId('box_text_')
    box.id = id
  } else {
    id = _.uniqueId('span_text_')
    box.id = id
  }

  return { box, id }
}

module.exports = (...powerElements) => {
  const { box, id } = createBox()

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

  const children = powerElements

  const me = Element({
    elementHtml: box,
    id,
    children,
  })

  Scene.show(me)

  return me
}
