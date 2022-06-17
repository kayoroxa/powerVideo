const obs = require('../../utils/observer')
const _ = require('lodash')
const { isNumber } = require('lodash')

function Element(me) {
  let inApp = false

  const { elementHtml } = me

  function set_x_y(op) {
    if (typeof op === 'string') {
      if (op === 'center') {
        elementHtml.style.left = `${
          window.innerWidth / 2 - elementHtml.offsetWidth / 2
        }px`
        elementHtml.style.top = `${
          window.innerHeight / 2 - elementHtml.offsetHeight / 2
        }px`
      }
    } else {
      const { x, y } = op
      if (x === 'center') {
        elementHtml.style.left = `${
          window.innerWidth / 2 - elementHtml.offsetWidth / 2
        }px`
      }
      if (y === 'center') {
        elementHtml.style.top = `${
          window.innerHeight / 2 - elementHtml.offsetHeight / 2
        }px`
      }
      if (isNumber(x)) elementHtml.style.left = x + 'px'
      if (isNumber(y)) elementHtml.style.top = y + 'px'
    }

    return _return
  }

  function getTransform(powerElement) {
    return window.getComputedStyle(powerElement.htmlElem).transform
  }

  function set_x_y_translate(op) {
    if (typeof op === 'string') {
      if (op === 'center') {
        elementHtml.style.transform = `translate(${
          window.innerWidth / 2 - elementHtml.offsetWidth / 2
        }px, ${window.innerHeight / 2 - elementHtml.offsetHeight / 2}px)`
      }
    } else {
      const { x, y } = op
      const translate = {}
      if (x === 'center') {
        translate.x = `${window.innerWidth / 2 - elementHtml.offsetWidth / 2}px`
      }
      if (y === 'center') {
        translate.y = `${
          window.innerHeight / 2 - elementHtml.offsetHeight / 2
        }px`
      }
      const rect = elementHtml.getBoundingClientRect()
      if (isNumber(x)) {
        translate.x = `${x - rect.left}px`
      }
      if (isNumber(y)) {
        translate.x = `${y - rect.top}px`
      }

      elementHtml.style.transform = `translate(${
        translate.x || getTransform(elementHtml).x
      }, ${translate.y || getTransform(elementHtml).y})`
    }
  }

  function get_x_y(offset = false) {
    if (offset) {
      const x = elementHtml.offsetLeft
      const y = elementHtml.offsetTop

      return { x, y }
    } else {
      const elRect = elementHtml.getBoundingClientRect()
      return {
        x: elRect.left,
        y: elRect.top,
      }
    }
  }

  function box_style(style) {
    Object.keys(style).forEach(key => {
      if (key === 'anchor') {
        if (style[key] === 'left') elementHtml.classList.remove('anchor-center')
      }
      elementHtml.style[key] = style[key]
    })
    return _return
  }

  function get_props() {
    const elRect = elementHtml.getBoundingClientRect()
    return elRect
  }

  function next_to(powerElement, side, margin = 0) {
    const { x, y } = powerElement.get_x_y()
    const rectElem = elementHtml.getBoundingClientRect()

    if (side === 'left') {
      elementHtml.style.left = x - rectElem.offsetWidth - margin + 'px'

      elementHtml.style.top =
        y +
        powerElement.htmlElem.offsetHeight / 2 -
        rectElem.offsetHeight / 2 +
        'px'
    } else if (side === 'right') {
      elementHtml.style.left =
        powerElement.htmlElem.offsetLeft +
        powerElement.htmlElem.offsetWidth +
        margin +
        'px'

      elementHtml.style.top = powerElement.htmlElem.offsetTop + 'px'
    } else if (side === 'top') {
      elementHtml.style.top = y - rectElem.offsetHeight - margin + 'px'

      elementHtml.style.left =
        x +
        powerElement.htmlElem.offsetWidth / 2 -
        rectElem.offsetWidth / 2 +
        'px'
    } else if (side === 'bottom') {
      elementHtml.style.top =
        powerElement.htmlElem.offsetTop +
        powerElement.htmlElem.offsetHeight +
        margin +
        'px'

      elementHtml.style.left =
        x +
        powerElement.htmlElem.offsetWidth / 2 -
        rectElem.offsetWidth / 2 +
        'px'
    }
    return _return
  }

  function refresh() {
    return _return
  }

  function rectChildren() {
    return [...elementHtml.children].map(child => {
      return child.getBoundingClientRect()
    })
  }

  const _return = {
    inApp,

    htmlElem: elementHtml,
    refresh,
    next_to,
    rectChildren,
    style: elementHtml.style,
    setStyle: newStyle => {
      Object.keys(newStyle).forEach(k => {
        if (k === 'colorAll') {
          elementHtml.querySelectorAll('*').forEach(c => {
            c.style.color = newStyle[k]
          })
        } else {
          elementHtml.style[k] = newStyle[k]
        }
      })
      return _return
    },
    set_width: () => {},
    move_to: powerElement => {
      // powerElement.htmlElem.
      const { x, y } = powerElement.get_x_y()
      set_x_y({ x, y })
      return _return
    },
    transform_to: powerElement => {
      // powerElement.htmlElem.
      const { x, y } = powerElement.get_x_y()
      set_x_y({ x, y })
      elementHtml.style.opacity = 0
      return _return
    },
    set_x_y,
    set_x_y_translate,
    get_x_y,
    get_props,
    save_state: () => {},
    get_center: () =>
      elementHtml.getBoundingClientRect().left + elementHtml.offsetWidth / 2,
    get_right: () => {},
    get_width: () => elementHtml.offsetWidth,
    get_height: () => elementHtml.offsetHeight,
    get_left: () => elementHtml.offsetLeft,
    get_top: () => elementHtml.offsetTop,
    box_style,
    ...me,
  }

  return _return
}

function Text(texts, options) {
  const element = document.createElement(options?.type || 'div')
  const id = _.uniqueId('text_')
  element.id = id
  element.classList.add('p-text')
  if (options?.type === 'span') element.classList.add('p-spam')
  else element.classList.add('p-absolute')

  let children = []

  if (typeof texts === 'string') {
    element.innerHTML = texts
  } else if (Array.isArray(texts)) {
    texts.forEach(text => {
      const spanPower = Text(text, { type: 'span' })
      children.push(spanPower)

      const text_element = spanPower.htmlElem
      text_element.innerHTML = text
      if (options?.selectStyle[text]) {
        text_element.style = options?.selectStyle[text]
      }
      element.appendChild(text_element)
    })
  }

  const _return = {
    children,
    ...Element(element, id),
  }

  obs('POWER_ELEMENT').notify('create', _return)

  return _return
}

module.exports = {
  Text,
  Element,
}
