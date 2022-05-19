const obs = require('./observer')
// const {addOnApp} = require('../')
const fakeStyle = ['link']

function Element(elementId, callBack) {
  let style = {
    position: 'absolute',
    backgroundColor: '#f00',
    height: 'fit-content',
    width: 'fit-content',
    color: '#fff',
    padding: '10px',
    margin: '10px',
    borderRadius: '5px',
    top: '0px',
    left: '0px',
    zIndex: '1',
  }

  let id = elementId
  let isShowing = false
  const element = document.createElement('div')
  element.classList.add('elemento')

  let initialStyle = style
  let initialElementStyle = element.style

  function revertCss() {
    element.style = initialElementStyle

    Object.keys(initialStyle).forEach(key => {
      if (fakeStyle.includes(key)) return
      element.style[key] = initialStyle[key]
    })

    style = initialElementStyle
  }

  function show() {
    addOnApp(element)
    Object.keys(style).forEach(key => {
      element.style[key] = style[key]
    })
    isShowing = true
    return _return
  }

  function getInnerHtml() {
    Object.keys(style).forEach(key => {
      element.style[key] = style[key]
    })
    return element.outerHTML
  }
  if (callBack) callBack(getInnerHtml())

  function changeContent(newContent) {
    if (!newContent) return _return

    element.innerHTML = newContent
      .split('')
      .map(char => {
        return `<span>${char}</span>`
      })
      .join('')

    if (!isShowing) show()
    return _return
  }

  function link(listenId) {
    console.log(listenId)
    // const elem = allElements.find(element => element.id === listenId).element
    // if (!elem) return _return
    // console.log(`${elem.offsetTop}px`, elem.style.top)
    // element.style.top = `${elem.offsetTop - 10 + elem.offsetHeight + 10}px`
    // element.style.left = `${elem.offsetLeft - 10 + elem.offsetWidth + 10}px`

    // obs('Change_Element').on('style', ({ linkId, linkElem }) => {
    //   console.log({ linkElem: linkElem.offsetTop })
    //   if (listenId === linkId) {
    //     element.style.top = `${
    //       linkElem.offsetTop - 10 + linkElem.offsetHeight + 10
    //     }px`
    //     element.style.left = `${
    //       linkElem.offsetLeft - 10 + linkElem.offsetWidth + 10
    //     }px`
    //   }
    // })
  }

  function changeStyle(newStyle, same) {
    if (!same) {
      //reset style to initial
      revertCss()
    }

    Object.keys(newStyle).forEach(key => {
      if (fakeStyle.includes(key)) return

      // if (newStyle?.link) {
      //   const elementLinked = allElements.find(
      //     element => element.id === newStyle.link
      //   )
      //   if (elementLinked) {
      //     console.log(elementLinked)
      //     if (key === 'left') {

      //     element.style[key] = elementLinked.getStyle()
      //   }
      // }

      element.style[key] = newStyle[key]
    })

    obs('Change_Element').notify('style', { linkId: id, linkElem: element })

    if (newStyle['right']) element.style['left'] = 'auto'
    if (newStyle['left']) element.style['right'] = 'auto'
    if (newStyle['bottom']) element.style['top'] = 'auto'
    if (newStyle['top']) element.style['bottom'] = 'auto'

    if (!isShowing) show()
    return _return
  }

  const _return = {
    element,
    id,
    getInnerHtml,
    getStyle: () => style,
    changeContent,
    changeStyle: changeStyle,
    link,
  }
  return { ..._return, show }
}

const allElements = []

function Elements(elementId) {
  if (!elementId) return

  let found = allElements.find(element => element.id === elementId)

  if (!found) {
    found = Element(elementId)
    allElements.push(found)
  }

  return found
}

module.exports = Elements

// elements()

//right = window.innerWidth - obj.offsetLeft - obj.offsetWidth
