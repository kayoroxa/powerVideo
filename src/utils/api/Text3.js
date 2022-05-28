const { Element } = require('./elements')
const _ = require('lodash')
const anime = require('animejs')

function get_tex_size(txt, font) {
  this.element = document.createElement('canvas')
  this.context = this.element.getContext('2d')
  this.context.font = font
  var textSize = {
    width: this.context.measureText(txt).width,
    height: parseInt(this.context.font),
  }
  return textSize
}

function createBox(type = 'div') {
  const box = document.createElement(type)
  let id = false
  box.classList.add('p-text-block')
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

function Text3(texts, type = 'div') {
  const { box, id } = createBox(type)
  box.style.justifyContent = 'center'
  box.classList.add('anchor-center')

  const children = []

  if (typeof texts === 'string') {
    const spanTransform = texts.replace(/\{(.*?)\}/g, (match, p1) => {
      const span = document.createElement('span')
      span.innerHTML = p1
      span.id = _.uniqueId('span_text_')
      span.classList.add('inline-block')

      return span.outerHTML
    })

    box.innerHTML = spanTransform
    ;[...box.children].forEach(child => {
      children.push(
        Element({
          elementHtml: child,
          text: child.innerHTML,
          id: child.id,
          changeTextTo,
        })
      )
    })

    // box.innerHTML = texts
  } else if (Array.isArray(texts)) {
    texts.forEach(text => {
      const span = document.createElement('span')
      span.innerHTML = text.replace(/\s/g, '&nbsp;')
      span.id = _.uniqueId('span_text_')
      span.classList.add('inline-block')
      box.appendChild(span)

      if (text !== ' ') {
        children.push(
          Element({
            elementHtml: span,
            text,
            id: span.id,
            changeTextTo,
          })
        )
      }
    })
  }

  function changeText(textBefore, textAfter) {
    textBefore.replace(new RegExp('\\s', 'g'), '&nbsp;')
    const reg = new RegExp(`(${textBefore})`, 'gi')
    const textBeforeFind = box.innerHTML.match(reg)[0]
    console.log(box)
    const prevOnlyText = box.innerHTML

    const currentOnlyText = prevOnlyText.replace(reg, textAfter)
    box.innerHTML = box.innerHTML.replace(/\s/, '&nbsp;')
    // debugger
    box.innerHTML = box.innerHTML.replace(
      reg,
      `<span class="text-change">
      <div class="before">$1</div>
      <div class="after" style="opacity: 0">${textAfter}</div>
    </span>`
    )

    const beforePreview = get_tex_size(textBeforeFind, '600 60px sans-serif')
    const nextPreview = get_tex_size(textAfter, '600 60px sans-serif')
    console.log(beforePreview, nextPreview)

    anime({
      targets: '.text-change',
      width: [beforePreview.width, nextPreview.width],
      easing: 'easeInOutQuad',
      duration: 250,
      delay: 100,
      // duration: 950,
    })
    anime.timeline().add({
      targets: '.text-change .before',
      opacity: [1, 0],
      translateY: [0, -beforePreview.height],
      translateX: [0, -beforePreview.width / 4],
      // translateX: [0, -beforePreview.width / 2],
      scale: [1, 0.5],
      duration: 300,
      easing: 'easeInOutQuad',
    })
    anime({
      targets: '.text-change .after',
      delay: 100,
      opacity: {
        value: [0, 1],
        easing: 'easeInOutQuad',
        duration: 100,
      },
      translateY: {
        value: [beforePreview.height + 40, 0],
        easing: 'spring(1, 80, 10, 0)',
      },

      complete: () => {
        setTimeout(() => {
          box.innerHTML = currentOnlyText
        }, 200)
      },
    })
  }

  function changeTextTo(textAfter) {
    const textBefore = box.innerHTML

    textBefore.replace(new RegExp('\\s', 'g'), '&nbsp;')
    const reg = new RegExp(`(${textBefore})`, 'gi')
    const textBeforeFind = box.innerHTML.match(reg)[0]
    console.log(box)
    // const prevOnlyText = box.innerHTML

    // const currentOnlyText = prevOnlyText.replace(reg, textAfter)
    box.innerHTML = box.innerHTML.replace(/\s/, '&nbsp;')
    // debugger
    box.classList.add('text-change')

    box.innerHTML = box.innerHTML.replace(
      reg,
      `<div class="before">$1</div>
      <div class="after" style="opacity: 0">${textAfter}</div>`
    )

    const beforePreview = get_tex_size(textBeforeFind, '600 60px sans-serif')
    const nextPreview = get_tex_size(textAfter, '600 60px sans-serif')
    console.log(beforePreview, nextPreview)

    anime({
      targets: '.text-change',
      width: [beforePreview.width, nextPreview.width],
      easing: 'easeInOutQuad',
      duration: 250,
      delay: 100,
      // duration: 950,
    })
    anime.timeline().add({
      targets: '.text-change .before',
      opacity: [1, 0],
      translateY: [0, -beforePreview.height],
      translateX: [0, -beforePreview.width / 4],
      // translateX: [0, -beforePreview.width / 2],
      scale: [1, 0.5],
      duration: 300,
      easing: 'easeInOutQuad',
    })
    anime({
      targets: '.text-change .after',
      delay: 100,
      opacity: {
        value: [0, 1],
        easing: 'easeInOutQuad',
        duration: 100,
      },
      translateY: {
        value: [beforePreview.height + 40, 0],
        easing: 'spring(1, 80, 10, 0)',
      },

      // complete: () => {
      //   setTimeout(() => {
      //     box.innerHTML = currentOnlyText
      //   }, 200)
      // },
    })
  }

  const _return = Element({
    children,
    elementHtml: box,
    id,
    changeText,
  })

  return _return
}

module.exports = {
  Text3,
}
