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

function Text2(texts, type = 'div') {
  const { box, id } = createBox(type)

  if (typeof texts === 'string') {
    box.innerHTML = texts
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

    anime
      .timeline()
      .add({
        targets: '.text-change .before',
        opacity: [1, 0],
        translateY: [0, -beforePreview.height],
        duration: 300,
        easing: 'easeInOutQuad',
      })
      .add({
        targets: '.text-change',
        width: [beforePreview.width, nextPreview.width],
        easing: 'easeInOutQuad',
        // duration: 950,
      })

      .add({
        targets: '.text-change .after',

        opacity: {
          value: [0, 1],
          easing: 'easeInOutQuad',
          duration: 300,
        },
        translateY: {
          value: [beforePreview.height + 20, 0],
          easing: 'spring(1, 80, 10, 0)',
        },
        complete: () => {
          setTimeout(() => {
            box.innerHTML = currentOnlyText
          }, 200)
        },
      })
  }

  const _return = Element({
    elementHtml: box,
    id,
    changeText,
  })

  return _return
}

module.exports = {
  Text2,
}
