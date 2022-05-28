const obs = require('../observer')
const anime = require('animejs')

function VGroup() {
  const _return = {
    animate: {
      next_to: () => {},
      set_width: () => {},
      move_to: () => {},
    },
    save_state: () => {},
    get_center: () => {},
    get_right: () => {},
    get_width: () => {},
    get_height: () => {},
    get_left: () => {},
    get_bottom: () => {},
  }

  return _return
}

function GrowFromCenter() {
  return
}

function addOnApp(PowerElement) {
  if (PowerElement.inApp === false) {
    document.querySelector('.app').appendChild(PowerElement.htmlElem)
    obs('POWER_ELEMENT').notify('load', PowerElement)
  }

  PowerElement.inApp = true
}

function FadeIn(PowerElement) {
  return {
    play: () => {
      PowerElement.htmlElem.style.opacity = 0
      if (PowerElement.inApp === false) addOnApp(PowerElement)

      setTimeout(() => {
        PowerElement.htmlElem.style.opacity = 1
      }, 500)
    },
  }
}

const Scene = {
  show: (...PowerElements) => {
    PowerElements.forEach(PowerElement => {
      console.log(PowerElement)
      addOnApp(PowerElement)
    })
  },
  playClick: (...animations) => {
    return new Promise(resolve => {
      document.addEventListener(
        'keydown',
        e => {
          if (e.repeat) return
          if (e.key === 'Enter') {
            animations.forEach(animation => {
              if (typeof animation === 'function') {
                animation()
                return
              }
              animation.play()
            })
            resolve()
          }
        }
        // { once: true }
      )
    })
  },
  playClicks: async animations => {
    for (let i = 0; i < animations.length; i++) {
      await Scene.playClick(animations[i])
    }
  },
}

function waitForElements(selectors, callBack) {
  let allFound = true

  selectors.forEach(selector => {
    if (!document.querySelector('#' + selector)) {
      allFound = false
    }
  })
  if (allFound) {
    callBack()
  } else {
    return new Promise(resolve => {
      const observer = new MutationObserver(() => {
        allFound = true
        selectors.forEach(selector => {
          if (!document.querySelector('#' + selector)) {
            allFound = false
          }
        })
        if (allFound) {
          callBack()
          observer.disconnect()
          resolve()
        }
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      })
    })
  }
}

function measure(el, fn) {
  var pV = el.style.visibility,
    pP = el.style.position

  el.style.visibility = 'hidden'
  el.style.position = 'absolute'

  document.body.appendChild(el)
  var result = fn(el)
  el.parentNode.removeChild(el)

  el.style.visibility = pV
  el.style.position = pP
  return result
}

async function measureSync(el) {
  var pV = el.style.visibility,
    pP = el.style.position

  el.style.visibility = 'hidden'
  el.style.position = 'absolute'

  document.body.appendChild(el)
  var result = el.getBoundingClientRect()
  el.parentNode.removeChild(el)

  el.style.visibility = pV
  el.style.position = pP
  return result
}

function measureNew(el) {
  var pV = el.style.visibility,
    pP = el.style.position

  el.style.visibility = 'hidden'
  el.style.position = 'absolute'

  document.body.appendChild(el)
  var result = el.getBoundingClientRect()
  el.parentNode.removeChild(el)

  el.style.visibility = pV
  el.style.position = pP
  return result
}
function measureChildren(el) {
  var pV = el.style.visibility,
    pP = el.style.position

  el.style.visibility = 'hidden'
  el.style.position = 'absolute'

  document.body.appendChild(el)

  const measureChildren = [...el.children].map(child => {
    return child.getBoundingClientRect()
  })

  el.parentNode.removeChild(el)

  el.style.visibility = pV
  el.style.position = pP

  return measureChildren
}

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

function changeTextTo(powerElement, textAfter, style) {
  const box = powerElement.htmlElem

  const textBefore = box.innerHTML
  textBefore.replace(new RegExp('\\s', 'g'), '&nbsp;')
  const reg = new RegExp(`(${textBefore})`, 'gi')
  const textBeforeFind = box.innerHTML.match(reg)[0]
  console.log(box)

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
    color: [style.color, style.color],
    backgroundColor: style.backgroundColor,
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

function Enfase(powerTexts, smallSize, bigSize) {
  return {
    select: index => {
      powerTexts.forEach((powerText, p_index) => {
        anime({
          targets: powerText.htmlElem,
          fontSize: index === p_index ? bigSize : smallSize,

          change: () => {
            obs('update').notify(powerText.id)
          },
        })
      })
    },
  }
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

async function morphText(powerElement1, powerElement2) {
  // powerElement2.children.forEach(child => {
  //   child.style.opacity = 0
  // })

  const pares = []
  const del = []

  powerElement1.children.forEach(child => {
    const child2Same = powerElement2.children.find(
      child2 => child2.text === child.text
    )
    child.htmlElem.classList.add('morph')
    if (child2Same) {
      pares.push({
        child1: child,
        child2: child2Same,
      })
    } else {
      del.push(child)
    }
  })

  const children2NotInPares = powerElement2.children.filter(
    child => !pares.find(pair => pair.child2 === child)
  )

  anime({
    targets: children2NotInPares.map(v => v.htmlElem),
    opacity: [0, 1],
    duration: 500,
    easing: 'easeInOutQuad',
  })

  const childrenRect2 = powerElement2.rectChildren()

  pares.forEach(async ({ child1, child2 }) => {
    const child1Rect = child1.htmlElem.getBoundingClientRect()
    const child2Rect = childrenRect2[child2.numberChild]

    anime({
      targets: child2.htmlElem,
      translateX: [child1Rect.left - child2Rect.left, 0],
      translateY: [child1Rect.top - child2Rect.top, 0],
      // delay: 5000,
      duration: 500,
      easing: 'easeInOutQuad',
    })

    anime({
      targets: child1.htmlElem,
      translateX: [0, child2Rect.left - child1Rect.left],
      translateY: [0, child2Rect.top - child1Rect.top],
      duration: 500,
      easing: 'easeInOutQuad',
    })
  })

  anime({
    targets: powerElement1.htmlElem,
    opacity: [1, 0],
    duration: 500,
    easing: 'easeInOutQuad',
  })

  Scene.show(powerElement2)
}

module.exports = {
  VGroup,
  GrowFromCenter,
  Scene,
  FadeIn,
  addOnApp,
  waitForElements,
  measure,
  measureSync,
  measureNew,
  measureChildren,
  changeTextTo,
  Enfase,
  sleep,
  morphText,
}
