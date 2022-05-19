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
  document.querySelector('.app').appendChild(PowerElement.htmlElem)
  obs('POWER_ELEMENT').notify('load', PowerElement)
}

function FadeIn(PowerElement) {
  PowerElement.htmlElem.style.opacity = 0
  addOnApp(PowerElement)

  return {
    play: () => {
      setTimeout(() => {
        PowerElement.htmlElem.style.opacity = 1
      }, 200)
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

module.exports = {
  VGroup,
  GrowFromCenter,
  Scene,
  FadeIn,
}
