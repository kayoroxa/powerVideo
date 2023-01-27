import { myScript } from '../script/myScript.js'

export function AppControl() {
  let index = Number(window.localStorage.getItem('index')) ?? 0

  function putSentence(en, pt) {
    const ptElem = document.querySelector('#pt')
    const enElem = document.querySelector('#en')
    const indexElem = document.querySelector('#index')

    enElem.innerText = en
    if (en.length > 30) enElem.style.fontSize = '60px'
    else enElem.style.fontSize = '64px'
    ptElem.innerText = pt

    if (pt.length > 30) ptElem.style.fontSize = '38px'
    else ptElem.style.fontSize = '40px'

    indexElem.textContent = `${index + 1}/${myScript.length}`
  }

  function nextSentence() {
    index = Math.min(index + 1, myScript.length - 1)
    window.localStorage.setItem('index', index)
    const line = myScript[index]
    putSentence(line[0], line[1])
  }

  function prevSentence() {
    index = Math.max(0, index - 1)
    window.localStorage.setItem('index', index)
    const line = myScript[index]
    putSentence(line[0], line[1])
  }

  putSentence(myScript[index][0], myScript[index][1])

  return {
    putSentence: () => {
      putSentence(putSentence(myScript[index][0], myScript[index][1]))
    },
    nextSentence,
    prevSentence,
    getLineSentence() {
      return { en: myScript[index][0], pt: myScript[index][1] }
    },
  }
}
