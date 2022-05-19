const obs = require('../../utils/observer')
const _ = require('lodash')

function Element(element) {
  function set_x_y({ x, y }) {
    if (x) element.style.left = x + 'px'
    if (y) element.style.top = y + 'px'

    return _return
  }

  function get_x_y() {
    const x = element.offsetLeft
    const y = element.offsetTop

    return { x, y }
  }

  function next_to(powerElement, side, margin) {
    console.log(margin)
    margin = margin || 10
    if (side === 'left') {
      element.style.left =
        powerElement.htmlElem.offsetLeft - element.offsetWidth - margin + 'px'

      element.style.top =
        powerElement.htmlElem.offsetTop +
        powerElement.htmlElem.offsetHeight / 2 -
        element.offsetHeight / 2 +
        'px'
    } else if (side === 'right') {
      element.style.left =
        powerElement.htmlElem.offsetLeft +
        powerElement.htmlElem.offsetWidth +
        margin +
        'px'
    } else if (side === 'top') {
      element.style.top =
        powerElement.htmlElem.offsetTop - element.offsetHeight - margin + 'px'

      element.style.left =
        powerElement.htmlElem.offsetLeft +
        powerElement.htmlElem.offsetWidth / 2 -
        element.offsetWidth / 2 +
        'px'
    } else if (side === 'bottom') {
      console.log(powerElement.htmlElem.offsetHeight)
      element.style.top =
        powerElement.htmlElem.offsetTop +
        powerElement.htmlElem.offsetHeight +
        margin +
        'px'
    }
    return _return
  }

  const _return = {
    htmlElem: element,
    next_to: (powerElement, side, margin) => {
      obs('POWER_ELEMENT').on('load', p_elem => {
        console.log(powerElement.id, ' = ', p_elem.id)
        if (p_elem.id === powerElement.id) {
          next_to(powerElement, side, margin)
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
    set_x_y,
    get_x_y,

    save_state: () => {},
    get_center: () =>
      element.getBoundingClientRect().left + element.offsetWidth / 2,
    get_right: () => {},
    get_width: () => element.offsetWidth,
    get_height: () => element.offsetHeight,
    get_left: () => element.offsetLeft,
    get_top: () => element.offsetTop,
  }

  return _return
}

function Text(texts, options) {
  const element = document.createElement(options?.type || 'div')
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

  return {
    id: _.uniqueId('text_'),
    children,
    setContent: () => {
      if (Array.isArray(texts)) throw new Error('Text is array')
      // const prevWidth = element.offsetWidth
      // // const afterWidth = // 10 - 5
      //   // 15 - x

      //   (element.element.width = prevWidth)
      // setTimeout(() => {
      //   element.innerHTML = text
      //   const newWidth = element.offsetWidth
      //   if (prevWidth !== newWidth) {
      //     element.style.width = newWidth + 'px'
      //   }
      // }, 200)
    },
    ...Element(element),
  }
}

module.exports = {
  Text,
}
