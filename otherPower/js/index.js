import { AppControl } from './appControl.js'
import {
  addSpanOnSelection,
  deleteElem,
  setCaretPosition,
  speak,
} from './utils.js'
let edit = false

export const fontSizeMultiplier = 1.8

const { nextSentence, prevSentence, getLineSentence } = AppControl()

// appControl

document.addEventListener('keydown', e => {
  console.log('click')
  const selObj = window.getSelection()
  const selRange = selObj.getRangeAt(0)
  if (selRange.length === 0) return
  const parentElem = selObj.anchorNode.parentNode

  if (e.key === 'Escape') {
    edit = false
  }

  if (e.key.toLowerCase() === 'a' && !edit) {
    prevSentence()
  }
  if (e.key.toLowerCase() === 'd' && !edit) {
    nextSentence()
  }

  if (e.key === '1') {
    addSpanOnSelection('highlight')
    return
  }
  if (e.key === '2') {
    addSpanOnSelection('deleted')
    return
  }
  if (e.key === 'Tab') {
    e.preventDefault()
    let selectedText = window.getSelection().toString()
    speak(selectedText?.length > 0 ? selectedText : getLineSentence().en)
  }

  // adicionar text box em cima do selecionado
  if (e.key === '3') {
    addSpanOnSelection('substitute')

    var rect = selRange.getBoundingClientRect()
    var x = rect.x + window.scrollX

    let editableDiv = document.createElement('span')
    editableDiv.className = 'info clickable'
    editableDiv.contentEditable = true
    edit = true

    editableDiv.addEventListener('input', function (e) {
      const spanEditable = e.target
      this.innerHTML = this.innerHTML.replace(/S/g, 'ə')
      this.innerHTML = this.innerHTML.replace(/Z/g, 'ð')
      this.innerHTML = this.innerHTML.replace(/T/g, 'θ')
      this.innerHTML = this.innerHTML.replace(/R/g, 'ɹ')

      spanEditable.focus()
      setCaretPosition(spanEditable, 1)
    })

    editableDiv.addEventListener('focus', () => {
      edit = true
    })

    editableDiv.addEventListener('blur', () => {
      edit = false
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
    editableDiv.style.fontSize = 50 * fontSizeMultiplier + 'px'
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
})
