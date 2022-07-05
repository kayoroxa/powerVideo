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

function refreshStyle(powerElements, box, id, start = false) {
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

  if (start) {
    box.style.top = `${childrenPropsMinY.top}px`
    box.style.left = `${childrenPropsMinX.left}px`
  }
  // box.style.transform = `translate(0px, 0px)`
  else {
    anime.set(box, {
      translateY: childrenPropsMinY.top - box.offsetTop,
      translateX: childrenPropsMinY.left - box.offsetLeft,
    })
  }

  box.style.position = 'absolute'
  // box.style.border = '1px solid red'
  box.style.zIndex = -5

  return { box, id }
}

async function set_x_y(elementHtml, children, op, easing) {
  let x = null
  let y = null

  if (op?.x) x = op.x
  if (op?.y) y = op.y

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

  if (easing === false) {
    anime.set([elementHtml, ...children.map(child => child.htmlElem)], {
      translateY: isNumber(y) ? y - elementHtml.offsetTop : null,
      translateX: isNumber(x) ? x - elementHtml.offsetLeft : null,
    })

    return
  } else {
    timeline.add(
      {
        targets: [elementHtml, ...children.map(child => child.htmlElem)],
        translateY: isNumber(y) ? y - elementHtml.offsetTop : null,
        translateX: isNumber(x) ? x - elementHtml.offsetLeft : null,
      },
      0
    )

    await timeline.finished
  }
}

async function setStyle(elementHtml, children, newStyle, { eachDelay }) {
  const timeline = anime.timeline({
    easing: 'easeOutExpo',
    duration: 500,
  })

  timeline.add({
    targets: [
      elementHtml,
      ...children.map(({ id }) =>
        document.querySelectorAll(`#${id} *, #${id}`)
      ),
    ],
    ...newStyle,

    delay: eachDelay
      ? function (_, i) {
          return i * 2
        }
      : 0,
  })

  await timeline.finished
}

module.exports = (...powerElements) => {
  const { box, id } = createBox()

  refreshStyle(powerElements, box, id, true)

  const children = powerElements

  const me = Element({
    elementHtml: box,
    id,
    children,
    set_x_y: (op, easing = true) => {
      set_x_y(box, children, op, easing)
    },
    setStyle(newStyle, each) {
      setStyle(box, children, newStyle, each)
      refreshStyle(powerElements, box, id)
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
