export function setCaretPosition(el, pos) {
  el.focus()
  var range = document.createRange()
  var sel = window.getSelection()
  range.setStart(el, pos)
  range.collapse(true)
  sel.removeAllRanges()
  sel.addRange(range)
}

function checkIfSelectionHasSpan() {
  const selObj = window.getSelection()
  if (
    selObj.anchorNode.nodeType === Node.ELEMENT_NODE &&
    selObj.anchorNode.tagName === 'SPAN'
  ) {
    return true
  }
  return false
}

export function addSpanOnSelection(className) {
  if (checkIfSelectionHasSpan()) {
    return
  }
  const sel = window.getSelection()
  if (sel.rangeCount) {
    let range = sel.getRangeAt(0)
    let selectedText = range.toString()
    range.deleteContents()
    let span = document.createElement('span')
    span.classList.add('clickable')
    span.ondragstart = () => false
    if (className) span.classList.add(className)
    span.textContent = selectedText
    range.insertNode(span)
    putDeleteListening()

    window.getSelection().removeAllRanges()
  }
}

export let controlIsDown = false

document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Control') {
    controlIsDown = true
    document.body.classList.add('control-pressed')
  }
})

document.addEventListener('keyup', function (evt) {
  if (evt.key === 'Control') {
    controlIsDown = false
    document.body.classList.remove('control-pressed')
  }
})

export function deleteElem(el) {
  if (!controlIsDown) return
  el.parentNode.removeChild(el)
}

export function putDeleteListeningIn() {
  document.querySelectorAll('.clickable').forEach(function (span) {
    span.addEventListener('click', function (e) {
      if (!controlIsDown) return
      const me = e.target
      var spanText = me.textContent
      me.parentNode.insertBefore(document.createTextNode(spanText), me)
      me.parentNode.removeChild(me)
    })
  })
  document.querySelectorAll('.info').forEach(function (me) {
    me.target.addEventListener('click', function () {
      if (!controlIsDown) return
      me.parentNode.removeChild(me)
    })
  })
}

export function putDeleteListening() {
  document.querySelectorAll('.clickable').forEach(function (span) {
    span.addEventListener('click', function (e) {
      if (!controlIsDown) return
      const me = e.target
      var spanText = me.textContent
      me.parentNode.insertBefore(document.createTextNode(spanText), me)
      me.parentNode.removeChild(me)
    })
  })
}

document.onmousedown = () => {
  window.getSelection().removeAllRanges()
}

export function speak(phrase) {
  const synth = window.speechSynthesis

  // let voice = synth
  //   .getVoices()
  //   .find(voice => voice.name === 'Google US English')
  // console.log(synth.getVoices())

  // debugger

  let voice = synth.getVoices().find(voice => voice.lang === 'en-US')
  // if (!voice) {
  //   voice = synth.getVoices().find(voice => voice.lang === 'en-US')
  // }
  const utterance = new SpeechSynthesisUtterance(phrase)
  utterance.voice = voice
  synth.speak(utterance)
}
