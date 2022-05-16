function Element(elementId, callBack) {
  const style = {
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

  let initialStyle = style
  let initialElementStyle = element.style

  function revertCss() {
    element.style = initialElementStyle

    Object.keys(initialStyle).forEach(key => {
      element.style[key] = initialStyle[key]
    })
  }

  function show() {
    document.querySelector('.app').appendChild(element)
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
    if (!isShowing) show()
    return _return
  }

  function changeStyle(newStyle, same) {
    if (!same) {
      //reset style to initial
      revertCss()
    }

    Object.keys(newStyle).forEach(key => {
      element.style[key] = newStyle[key]
    })
    if (!isShowing) show()
    return _return
  }

  const _return = {
    id,
    getInnerHtml,
    getStyle: () => style,
    changeContent,
    changeStyle: changeStyle,
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
