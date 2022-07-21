function Flex() {
  const elementsInFlex = []

  function add(powerElement, { w: wPercent, yPercent, line }) {
    elementsInFlex.push({
      pElem: powerElement,
      location: { wPercent, yPercent, line },
    })
  }

  function remove(powerElement) {
    const index = elementsInFlex.findIndex(elem => elem.pElem === powerElement)
    if (index === -1) return
    elementsInFlex.splice(index, 1)
  }

  function getElementsInLine(line) {
    return elementsInFlex.filter(elem => elem.location.line === line)
  }

  function distribute(line) {
    //left and top
    const elementsInLine = getElementsInLine(line)
    // const widths
  }

  function updateAll() {}

  return {
    add,
    remove,
  }
}
