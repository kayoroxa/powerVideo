/* eslint-disable */

const rawScript = `
I want to go
Eu quero ir

she wants to go
ela quer ir

to the apartment
para o apartamento

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

she wants to go to the apartment
ela quer ir para o apartamento

she wants to go home
ela quer ir para casa

she wants to go home with me
ela quer ir para casa comigo

she doesn't want to go
ela não quer ir 

she doesn't want to go to the supermarket
ela não quer ir ao supermercado

she doesn't want to go to the restaurant with me
ela não quer ir ao restaurante comigo

she doesn't want to go home with me
ela não quer ir para casa comigo

I would like
eu gostaria de

I would like to go to the supermarket
eu gostaria de ir ao supermercado

too
também

she would like to go too
ela gostaria de ir também

i would like to go to the market too
eu gostaria de ir para o mercado também 

she would like to go to the market with me too
ela gostaria de ir para o mercado comigo também


but
mas

I would like to go to a restaurant, but she doesn't want to go
eu gostaria de ir para restaurante, mas ela não quer ir
  




I have to
eu tenho que 

call my mother
chamar minha mãe

I have to call my mother
eu tenho que chamar minha mãe

i have to call my mom to go home
eu tenho que chamar minha mãe para ir pra casa

she would like to go so i have to call
ela gostaria de ir então eu tenho que chamar

she doesn't want to go
ela não quer ir

she doesn't want to go but i have to call
ela não quer ir mas eu tenho que chamar

she doesn't want to go but i have to go to the restaurant
ela não quer ir mas eu tenho que ir para o restaurante

I want to go but she doesn't want to go
eu quero ir mas ela não quer ir

I want to go
eu quero ir

I want to go but my mother doesn't want to go
eu quero ir mas minha mãe não quer ir

I want to call my mother
eu quero chamar minha mãe

I want to call my mother to go with me
eu quero chamar minha mãe para ir comigo

`

const teach = `
with me
comigo
so
então
(she|you|i) (does|do)n't want
(do|does)? (she|i|you) wants?
(ela|eu|você) (não)? quero?
(she|i|you) have to
(ela|eu|você) (não)? (tem|tenho) que
(she|i|you) would like
(ela|eu|você) (não)? gostaria de
with
com
perfume
(to)? go
ir
também
too
mas
but
also
`
  .split(/\n/g)
  .filter(Boolean)
  .map(v =>
    v
      .trim()
      .replace(/([^|()\?]+(?=[^(]*\)\?))/g, '$1 ')
      .replace(/(\(.*?\)\?)\s/g, '$1')
  )

// .sort((a, b) => b.length - a.length)

const scriptReplaced = teach
  .reduce((acc, cur) => {
    const reg = new RegExp(`(${cur})(?![^{]*})`, 'gi')
    // debugger
    return acc.replace(reg, `{$1}`)
  }, rawScript)
  .replace(/\?/g, '{?}')

console.log(scriptReplaced)
// debugger

const script = scriptReplaced
  .trim()
  .split(/\n\n+/g)
  .filter(v => v.length > 0)
  .reverse()
  .map(v => ({ pt: v.split('\n')[0].trim(), en: v.split('\n')[1].trim() }))

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
  function find(query) {
    return Array.from(document.querySelectorAll(query)).find(
      el =>
        el.textContent.toLocaleLowerCase().trim() ===
        split(script[indexScript].en)[index].toLocaleLowerCase().trim()
    )
  }
  const element0 = find('.blocks .block:not(.fixed, .resolved)')
  const element1 = find('.waiting .block:not(.fixed, .resolved)')

  const elements = [element0, element1]
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

  elements[1].classList.add('resolved')
  elements[0].classList.add('resolved')
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
