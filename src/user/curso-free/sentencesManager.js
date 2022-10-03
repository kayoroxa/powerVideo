/* eslint-disable */

const rawScript = `
I want to go
Eu quero ir

she wants to go
ela quer ir

I want to go to the apartment
Eu quero ir para o apartamento

I want to go to the restaurant
Eu quero ir ao restaurante

I want to go home
Eu quero ir para casa

do you want to go?
você quer ir?

do you want to go to the restaurant?
você quer ir ao restaurante?
`

const teach = [
  'ir',
  'eu quer.*',
  'to go',
  'você quer ir',
  'I want',
  'do you want',
].sort((a, b) => a.length - b.length)

const scriptReplaced = teach.reduce((acc, cur) => {
  const reg = new RegExp(`(${cur})`, 'gi')
  return acc.replace(reg, `{$1}`).replace(/\?/g, '{?}')
}, rawScript)

const script = scriptReplaced
  .trim()
  .split(/\n\n+/g)
  .filter(v => v.length > 0)
  .map(v => ({ pt: v.split('\n')[0].trim(), en: v.split('\n')[1].trim() }))
debugger

const scripts = [
  // {
  //   pt: 'quão longe | temos | nós | vindo',
  //   en: `how far | have | we | gone`,
  // },
  // {
  //   pt: 'quão alto | você | é | ?',
  //   en: `how tall | you | are | ?`,
  // },
  // {
  //   pt: 'quanto | dinheiro | você tem | ?',
  //   en: `how much | money | do you have | ?`,
  // },
  // {
  //   pt: 'quanto tempo |você | ficou | lá | ?',
  //   en: `How much time |you | was | there | ?`,
  // },
  // {
  //   pt: 'quão | velho | você está | ?',
  //   en: `how | old |are you | ?`,
  // },
]

const template = (en, pt) => {
  const str = `
    <div class="column">
      <div class="block ${pt === '?' ? 'fixed' : ''}">${pt}</div>
      <div class="block ${en === '?' ? 'fixed' : 'hidden'} stroke">${en}</div>
    </div>
  `
  return str //new DOMParser().parseFromString(str, 'text/xml')
}
const template2 = word => `<div class="block hidden">${word}</div>`

// [["Tudo bem", "all right"], ["hora", "time"]]

function split(v) {
  return v
    .split(/(\{|\})/g)
    .filter(v => v !== ' ' && v.length > 0 && v !== '{' && v !== '}')
}

function putInHtml(indexScript) {
  const enSplitted = split(script[indexScript].en)

  const ptSplitted = split(script[indexScript].pt)

  const splitted = enSplitted.map((_, index) => [
    enSplitted[index],
    ptSplitted[index],
  ])

  debugger

  const withoutPunctuation = enSplitted.filter(en => en !== '?')
  // const withPunctuation = enSplitted.find(en => en === '?')
  const strHtmls = splitted.map(([en, pt]) => template(en, pt))
  const strHtmlWaiting = _.shuffle(withoutPunctuation.map(pt => template2(pt)))

  // if (withPunctuation) strHtmlWaiting.push(template2(withPunctuation))

  const blocksElem = document.querySelector('.blocks')
  for (let strHtml of strHtmls) {
    blocksElem.insertAdjacentHTML('beforeend', strHtml)
  }

  const waitingElem = document.querySelector('.waiting')
  for (let strtHtmlWaiting of strHtmlWaiting) {
    waitingElem.insertAdjacentHTML('beforeend', strtHtmlWaiting)
  }
  anime.set(document.querySelectorAll('.block'), { scale: 0 })

  anime({
    targets: document.querySelectorAll('.block'),
    scale: 1,
    duration: 500,
  })
}

function handleOnClickInSentence(index, indexScript) {
  debugger
  const elements = Array.from(
    document.querySelectorAll('.block:not(.fixed)')
  ).filter(
    el =>
      el.textContent.toLocaleLowerCase().trim() ===
      split(script[indexScript].en)[index].toLocaleLowerCase().trim()
  )
  if (!elements[0] || !elements[1]) return

  const prevWidth = elements[0].getBoundingClientRect().width

  elements[0].classList.remove('hidden')

  anime.set(elements[0], {
    translateX:
      elements[1].getBoundingClientRect().left -
      elements[0].getBoundingClientRect().left,
    translateY:
      elements[1].getBoundingClientRect().top -
      elements[0].getBoundingClientRect().top,
    width: elements[1].getBoundingClientRect().width,
  })
  anime.set(elements[1], { opacity: 0 })

  anime({
    targets: elements[0],
    translateX: 0,
    translateY: 0,
    width: prevWidth,
    easing: 'easeOutQuart',
    duration: 950,
  })

  index++
}

function deletarTudo() {
  document.querySelector('.blocks').innerHTML = ''
  document.querySelector('.waiting').innerHTML = ''
}

function showScene() {}

function Scene() {
  let indexBlock = 0
  let sceneIndex = 0
  let isStarted = true

  putInHtml(sceneIndex)

  return {
    get isStarted() {
      return isStarted
    },
    nextBlock: () => {
      if (indexBlock > split(script[sceneIndex].en).length - 1) return
      handleOnClickInSentence(indexBlock, sceneIndex)
      indexBlock++
    },
    nextScene: () => {
      if (sceneIndex >= script.length - 1) return
      indexBlock = 0
      deletarTudo()
      sceneIndex++
      putInHtml(sceneIndex)
    },
    prevScene: () => {
      if (sceneIndex <= 0) return
      indexBlock = 0
      deletarTudo()
      sceneIndex--
      putInHtml(sceneIndex)
    },
    start: () => {
      sceneIndex = 0
      putInHtml(indexBlock)
    },
  }
}

const myScene = Scene()

document.addEventListener('keydown', event => {
  if (!myScene.isStarted) {
    myScene.start()
  }
  if (event.key.toLowerCase() === 'enter' || event.key === ' ') {
    myScene.nextBlock()
  }
  if (event.key === 'ArrowRight' || event.key.toLocaleLowerCase() === 'd') {
    myScene.nextScene()
  }
  if (event.key === 'ArrowLeft' || event.key.toLocaleLowerCase() === 'a') {
    myScene.prevScene()
  }
})
