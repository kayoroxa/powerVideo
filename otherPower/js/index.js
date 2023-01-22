import { addSpanOnSelection, deleteElem, setCaretPosition } from './utils.js'

document.onkeydown = function (e) {
  const selObj = window.getSelection()
  const selRange = selObj.getRangeAt(0)
  if (selRange.length === 0) return
  const parentElem = selObj.anchorNode.parentNode

  if (e.key === '1') {
    addSpanOnSelection('highlight')
    return
  }
  if (e.key === '2') {
    addSpanOnSelection('deleted')
    return
  }

  // adicionar text box em cima do selecionado
  if (e.key === 'e') {
    addSpanOnSelection('substitute')

    var rect = selRange.getBoundingClientRect()
    var x = rect.x + window.scrollX

    let editableDiv = document.createElement('span')
    editableDiv.className = 'info clickable'
    editableDiv.contentEditable = true

    editableDiv.addEventListener('input', function (e) {
      const spanEditable = e.target
      this.innerHTML = this.innerHTML.replace(/S/g, 'ə')
      this.innerHTML = this.innerHTML.replace(/Z/g, 'ð')
      this.innerHTML = this.innerHTML.replace(/T/g, 'θ')

      spanEditable.focus()
      setCaretPosition(spanEditable, 1)
    })

    const clientRects = selRange.getClientRects()
    const top = clientRects[clientRects.length - 1].top

    const w = 900
    editableDiv.textContent = ''
    editableDiv.style.position = 'absolute'
    editableDiv.style.width = w + 'px'
    editableDiv.style.bottom = window.innerHeight - top - 30 + 'px'
    // elem.style.bottom = window.innerHeight - y - window.scrollY - height + 'px'
    editableDiv.style.left = x + rect.width / 2 - w / 2 + 'px'
    editableDiv.style.textAlign = 'center'
    editableDiv.style.fontSize = '50px'
    editableDiv.spellcheck = false
    editableDiv.style.caretColor = 'transparent'
    editableDiv.onclick = () => deleteElem(editableDiv)

    //center
    setTimeout(() => {
      editableDiv.focus()
    }, 0)

    // elem.setAttribute('tabindex', '0')

    parentElem.insertBefore(editableDiv, parentElem.childNodes[0])
  }
}
