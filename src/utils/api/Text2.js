const { Element } = require('./elements')
const _ = require('lodash')
const anime = require('animejs')

function get_tex_size(txt, font) {
  this.element = document.createElement('canvas')
  this.context = this.element.getContext('2d')
  this.context.font = font
  var tsize = {
    width: this.context.measureText(txt).width,
    height: parseInt(this.context.font),
  }
  return tsize
}

// a caixa fica no centro
// as letras são divididas by caracteres

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

  //find biggest length of array
  // const bigLength = _.maxBy(textGroups, group => group.length).length

  // for (let i = 0; i < bigLength; i++) {
  //   const op = textGroups.map(group => group[i]).filter(Boolean)
  //   const span = document.createElement('span')
  //   op.forEach((text, i) => {
  //     span.innerHTML += `<div class='o-${i}'>${text}</div>`
  //   })
  //   box.appendChild(span)
  // }

  function changeText(textBefore, textAfter) {
    const reg = new RegExp(`(${textBefore})`, 'gi')
    console.log(box)
    box.innerHTML = box.innerHTML.replace(
      reg,
      `<span class="text-change">
      <div class="before">$1</div>
      <div class="after" style="opacity: 0">${textAfter}</div>
    </span>`
    )

    const beforePreview = get_tex_size(textBefore, '600 60px sans-serif')
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
  // morphText,
}

// function morphText(boxText1, boxText2) {
//   const child1 = boxText1.children
//   const child2 = boxText2.children

//   debugger

//   function moveSpan(span1, span2) {
//     const initialLeft = span2.htmlElem.offsetLeft
//     const initialTop = span2.htmlElem.offsetTop
//     const initialWidth = span2.htmlElem.offsetWidth
//     const initialHeight = span2.htmlElem.offsetHeight

//     span2.htmlElem.style.position = 'absolute'

//     // clone

//     span2.htmlElem.style.left = span1.htmlElem.offsetLeft + 'px'
//     span2.htmlElem.style.top = span1.htmlElem.offsetTop + 'px'

//     setInterval(() => {
//       span2.htmlElem.style.left = initialLeft + 'px'
//       span2.htmlElem.style.top = initialTop + 'px'
//     }, 200)
//   }

//   moveSpan(child1[0], child2[0])
// }
