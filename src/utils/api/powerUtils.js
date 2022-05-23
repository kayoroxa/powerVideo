const obs = require('../observer')

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

// obs('POWER_ELEMENT').on('create', PowerElement => {
//   if (PowerElement.inApp === false) addOnApp(PowerElement)
// })

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
          }
          resolve()
        },
        { once: true }
      )
    })
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

module.exports = {
  VGroup,
  GrowFromCenter,
  Scene,
  FadeIn,
  addOnApp,
  waitForElements,
  measure,
}
