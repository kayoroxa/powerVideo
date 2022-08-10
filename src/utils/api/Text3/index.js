const { Element } = require('../elements')
const _ = require('lodash')
const { createBox, changeTextTo, changeText } = require('./methods')
const { addOnApp } = require('../powerUtils')
const bug = require('../../bug')

function generateSpanElement(child, index) {
  const textRaw = child.innerHTML
  child.innerHTML = child.innerHTML.replace(/[+\-*/]{2,}/g, '') //remove +-*/ in sequence

  return Element({
    getRect: () => {
      const rect = child.getBoundingClientRect()
      bug(rect.left > 0, 'Text3: childrenRect[index] > 0')
      return rect
    },
    elementHtml: child,
    text: child.innerHTML,
    textRaw,
    id: child.id,
    numberChild: index,
    changeTextTo,
  })
}

function Text3(texts) {
  const { box, id } = createBox('div')
  box.classList.add('hide')
  box.style.justifyContent = 'center'
  box.classList.add('anchor-center')

  addOnApp(box)

  const children = []

  if (typeof texts === 'string') {
    const spanTransform = texts.replace(/\{(.*?)\}/g, (match, p1) => {
      const span = document.createElement('span')
      span.innerHTML = p1 === ' ' ? '&nbsp;' : p1
      span.id = _.uniqueId('span_text_')
      span.classList.add('inline-block')

      return span.outerHTML
    })

    box.innerHTML = spanTransform
    ;[...box.children].forEach((child, index) => {
      children.push(generateSpanElement(child, index))
    })
  } else if (Array.isArray(texts)) {
    texts.forEach((text, index) => {
      const span = document.createElement('span')
      span.innerHTML = text.replace(/\s/g, '&nbsp;')
      span.id = _.uniqueId('span_text_')
      span.classList.add('inline-block')
      box.appendChild(span)

      if (text !== ' ') {
        generateSpanElement(span, index)
      }
    })
  }

  const _return = Element({
    children,
    elementHtml: box,
    id,
    changeText,
    show: () => {
      box.classList.remove('hide')
    },
    getRect: () => {
      const rect = box.getBoundingClientRect()
      bug(rect.left > 0, 'box: childrenRect[index] > 0')
      return rect
    },
    setStyle: newStyle => {
      Object.keys(newStyle).forEach(k => {
        if (k === 'textShadow' && newStyle[k] == 1) {
          box.style[k] =
            '2px 0 0 #011628, -2px 0 0 #011628, 0 2px 0 #011628, 0 -2px 0 #011628, 1px 1px #011628, -1px -1px 0 #011628, 1px -1px 0 #011628, -1px 1px 0 #011628'
        }
        box.style[k] = newStyle[k]
        box.querySelectorAll('*').forEach(c => {
          c.style[k] = newStyle[k]
        })
      })
      return _return
    },
  })

  return _return
}

module.exports = {
  Text3,
}
