let controlIsDown = false

document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Control') {
    controlIsDown = true
  }
})

document.addEventListener('keyup', function (evt) {
  if (evt.key === 'Control') {
    controlIsDown = false
  }
})

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

function addSpanOnSelection(className) {
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
    if (className) span.classList.add(className)
    span.textContent = selectedText
    range.insertNode(span)
  }
}

document.onkeydown = function (e) {
  const selObj = window.getSelection()
  const selRange = selObj.getRangeAt(0)
  if (selRange.length === 0) return
  const parentElem = selObj.anchorNode.parentNode

  if (e.key === '1') {
    addSpanOnSelection('highlight')
    putDeleteListening()
    return
  }
  if (e.key === '2') {
    addSpanOnSelection('deleted')
    putDeleteListening()
    return
  }

  // adicionar text box em cima do selecionado
  if (e.key === 'e') {
    addSpanOnSelection('deleted')
    putDeleteListening()
    var rect = selRange.getBoundingClientRect()
    var x = rect.x + window.scrollX

    let elem = document.createElement('span')
    elem.className = 'info'
    elem.contentEditable = true

    const clientRects = selRange.getClientRects()
    const top = clientRects[clientRects.length - 1].top

    const w = 900
    elem.textContent = ''
    elem.style.position = 'absolute'
    elem.style.width = w + 'px'
    elem.style.bottom = window.innerHeight - top - 30 + 'px'
    // elem.style.bottom = window.innerHeight - y - window.scrollY - height + 'px'
    elem.style.left = x + rect.width / 2 - w / 2 + 'px'
    elem.style.textAlign = 'center'
    elem.style.fontSize = '50px'
    elem.spellcheck = false
    elem.style.caretColor = 'transparent'

    //center
    setTimeout(() => {
      elem.focus()
    }, 0)

    // elem.setAttribute('tabindex', '0')

    parentElem.insertBefore(elem, parentElem.childNodes[0])
  }
}

function putDeleteListening() {
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
