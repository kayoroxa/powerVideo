const anime = require('animejs')

function fitElementToParent(el, padding) {
  let timeout = null
  function resize() {
    if (timeout) clearTimeout(timeout)
    anime.set(el, { scale: 1 })
    let pad = padding || 0
    let parentEl = el.parentNode

    let elOffsetWidth = el.offsetWidth - pad
    let parentOffsetWidth = parentEl.offsetWidth
    let ratio = parentOffsetWidth / elOffsetWidth
    console.log(
      el.offsetWidth,
      parentEl.offsetWidth,
      parentOffsetWidth / elOffsetWidth
    )
    timeout = setTimeout(anime.set(el, { scale: ratio }), 10)
  }
  resize()
  window.addEventListener('resize', resize)
}

const animated = function () {
  let easingVisualizerEl = document.querySelector('.easing-visualizer')
  let barsWrapperEl = easingVisualizerEl.querySelector('.bars-wrapper')
  let dotsWrapperEl = easingVisualizerEl.querySelector('.dots-wrapper')
  let barsFragment = document.createDocumentFragment()
  let dotsFragment = document.createDocumentFragment()
  let numberOfBars = 97
  let animation

  fitElementToParent(easingVisualizerEl, -100)

  for (let i = 0; i < numberOfBars; i++) {
    let barEl = document.createElement('div')
    let dotEl = document.createElement('div')
    barEl.classList.add('bar')
    dotEl.classList.add('dot')
    dotEl.classList.add('color-red')
    barsFragment.appendChild(barEl)
    dotsFragment.appendChild(dotEl)
  }

  barsWrapperEl.appendChild(barsFragment)
  dotsWrapperEl.appendChild(dotsFragment)

  function play() {
    if (animation) animation.pause()
  }

  play()
}

animated()
