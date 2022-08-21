const obs = require('../../utils/observer')
const { clipboard, nativeImage } = require('electron')
const joinPath = require('path').join
const _ = require('lodash')

const fontSize = 150
const audiosName = [
  //
  // 'key1',
  'key2',
]

const writeImageFromUrl = (url, dataType) => {
  if (url.startsWith('file://')) {
    url = url.substr(7)
  }
  const img =
    dataType === 'base64'
      ? nativeImage.createFromDataURL(url)
      : nativeImage.createFromPath(url)
  clipboard.writeImage(img)
}

const getImageData = nativeImg => {
  if (nativeImg && !nativeImg.isEmpty()) {
    const size = nativeImg.getSize()
    const base64 = nativeImg.toDataURL()
    const base64Length = base64.length
    return {
      name: `clipboard-image-${size.width}x${size.height}.png`,
      type: 'base64',
      base64,
      width: size.width,
      height: size.height,
      size: Math.ceil(
        4 * (base64Length / 3) + (base64Length % 3 !== 0 ? 4 : 0)
      ),
    }
  }
  return null
}

let lastNewImage = getImageData(clipboard.readImage())
const getNewImage = () => {
  const currentImage = getImageData(clipboard.readImage())
  if (
    !lastNewImage ||
    !currentImage ||
    currentImage.base64 !== lastNewImage.base64
  ) {
    lastNewImage = currentImage
    return currentImage
  }
  return null
}
let canKeyClick = false
let changeMousePosition = false

let mousePosition = { x: false, y: false }
let lastPosition = { x: false, y: false }

document.querySelector('body').addEventListener('mousemove', function (event) {
  mousePosition = { x: event.x, y: event.y }
  changeMousePosition = true
  deleteEmptyDiv()
})

let lastText = []

obs('KEY').on('priority', p => {
  if (p === 'cursor-magic') canKeyClick = true
  else canKeyClick = false
})

document.addEventListener('keydown', async e => {
  if (e.key === 'ArrowUp') {
    lastPosition.y -= fontSize + 5
    add(null, false)
  } else if (e.key === 'ArrowDown' || e.key === 'Enter') {
    lastPosition.y += fontSize + 5
    add(null, false)
  }

  if (e.key === 'Insert') {
    obs('KEY').notify('priority', 'cursor-magic')
    add()
  }
  if (e.key === 'PageDown') {
    obs('KEY').notify('priority', 'cursor-magic')
    add(true)
  }
  if (e.key === 'Escape') {
    setTimeout(() => obs('KEY').notify('priority', false), 50)
  }
  if (e.key === 'Home') {
    // clear()
    closeAll()
  }
  if (e.key === '9') {
    getNewImage() && writeImageFromUrl(lastNewImage.base64, 'base64')
  }
  if (e.key === '1') return addSpanClass('one')
  if (e.key === '2') return addSpanClass('two')
  if (e.key === '3') return addSpanClass('three')
  if (e.key === '4') return addSpanClass('four')
  if (e.key === '5') return addSpanClass('five')
  if (e.key === '6') return addSpanClass('six')
  if (e.key === '7') return addSpanClass('seven')
  if (e.key === '8') return addSpanClass('eight')
  if (e.key === '9') return addSpanClass('nine')
  if (e.key === '0') return addSpanClass('zero')

  if (!canKeyClick) return
  if (e.key === '=' || e.key === '/') {
    addSpanNeutral(e.key, 'zero')
  } else if (e.key.length === 1) {
    if (changeMousePosition) {
      add()
    }
    change(e.key)
  } else if (e.key === 'Backspace') {
    e.preventDefault()
    backspace()
  }
})

let lastClass

function addSpanNeutral(key, numberString = 'zero') {
  const lastDiv = lastText[lastText.length - 1]
  if (!lastDiv) return

  const newSpan = document.createElement('span')

  if (lastDiv.lastChild.innerHTML.length < 1) {
    lastDiv.removeChild(lastDiv.lastChild)
  }

  newSpan.style.fontSize = fontSize
  newSpan.classList.add('magic-cursor')
  newSpan.classList.add(numberString)

  newSpan.innerHTML = ' ' + key + ' '

  newSpan.style.fontSize = fontSize + 'px'

  removeLastSpace()
  lastDiv.appendChild(newSpan)
  playAudio()

  addSpanClass(lastClass)
}

function addSpanClass(numberString) {
  const lastDiv = lastText[lastText.length - 1]

  if (!lastDiv) return

  lastClass = numberString
  const newSpan = document.createElement('span')

  if (lastDiv.lastChild.innerHTML.length < 1) {
    lastDiv.removeChild(lastDiv.lastChild)
  }

  newSpan.style.fontSize = fontSize
  newSpan.classList.add('magic-cursor')
  newSpan.classList.add(numberString)
  newSpan.style.fontSize = fontSize + 'px'

  lastDiv.appendChild(newSpan)
}

function lastEndWithSpace() {
  const lastDiv = lastText[lastText.length - 1]
  if (!lastDiv) return
  const lastSpan = lastDiv.lastChild
  if (lastSpan.innerHTML.length > 0) {
    return lastSpan.innerHTML.endsWith(' ')
  } else if (lastSpan.previousSibling.innerHTML.length > 0) {
    return lastSpan.previousSibling.innerHTML.endsWith(' ')
  }
}

function removeLastSpace() {
  if (lastEndWithSpace()) {
    const lastDiv = lastText[lastText.length - 1]
    const lastSpan = lastDiv.lastChild
    lastSpan.innerHTML = lastSpan.innerHTML.slice(0, -1)
  }
}

function change(key) {
  changeMousePosition = false
  if (!lastText[lastText.length - 1]) return

  if (key === ' ' && lastEndWithSpace()) return

  playAudio()
  lastText[lastText.length - 1].lastChild.innerHTML += key
  deleteEmptyDiv()
}

function backspace() {
  if (!lastText[lastText.length - 1]) return
  playAudio()

  let lastChild = lastText[lastText.length - 1].lastChild

  if (lastChild.innerHTML.length < 1) {
    lastText[lastText.length - 1].removeChild(lastChild)
  }

  lastChild = lastText[lastText.length - 1].lastChild

  lastChild.innerHTML = lastChild.innerHTML.slice(0, -1)
}

let audioRandom

function add(xCenter, byMouse = true) {
  changeMousePosition = false
  let myPosition = byMouse ? mousePosition : lastPosition

  if (myPosition.x === false || myPosition.y === false) return
  audioRandom = _.sample(audiosName)

  const left = xCenter ? window.innerWidth / 2 : myPosition.x
  const top = myPosition.y

  const div = document.createElement('div')
  div.classList.add('d-text-cursor-magic')
  div.style.top = top + 'px'
  div.style.left = left + 'px'

  div.style.fontSize = fontSize + 'px'

  div.style.transform = 'translate(-50%, -50%)'

  const span = document.createElement('span')
  span.classList.add('magic-cursor')
  span.classList.add('one')

  // span.style.color = 'white'
  span.innerText = ''
  span.style.fontSize = fontSize + 'px'

  div.appendChild(span)

  // document.querySelector('body').appendChild(div)

  lastPosition = { x: left, y: top }

  document.querySelector('.app').appendChild(div)

  if (lastText[lastText.length - 1]?.innerText.length < 1) {
    lastText[lastText.length - 1].parentNode.removeChild(
      lastText[lastText.length - 1]
    )
  }
  lastText.push(div)
}

function deleteEmptyDiv() {
  const div = document.querySelectorAll('.d-text-cursor-magic')
  div.forEach(v => {
    if (v.innerText.length < 1) {
      v.parentNode.removeChild(v)
    }
  })
}

function playAudio() {
  const audioElem = document.createElement('audio')
  audioElem.src = joinPath(__dirname, `../../audios/${audioRandom}.wav`)
  audioElem.play()

  audioElem.onended = () => {
    audioElem.remove()
  }
}

function closeAll() {
  const anime = require('animejs')

  const div = document.querySelectorAll('.d-text-cursor-magic')
  div.forEach(v => {
    anime({
      targets: v,
      opacity: 0,
      // translateY: '-100px',
      scale: 0,
      duration: 500,
      easing: 'easeInOutBack',
      complete: () => {
        v.parentNode.removeChild(v)
      },
    })
  })
}
