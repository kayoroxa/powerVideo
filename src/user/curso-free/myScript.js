/* eslint-disable */

function morph(dataChildrenPrev, dataChildrenCur) {
  const myData = dataChildrenCur.map(({ target }, i) => ({
    target,
    prevRect: dataChildrenPrev[i].rect,
    curRect: dataChildrenCur[i].rect,
  }))

  for (let data of myData) {
    const myDataPrev = data.prevRect

    const myDataCur = data.curRect

    anime({
      targets: data.target,
      translateX: [myDataPrev.left - myDataCur.left, 0],
      translateY: [myDataPrev.top - myDataCur.top, 0],
      easing: 'linear',
      // duration: 6000,
    })
  }
}

function append(curParent, box) {
  const prevParent = box.parentElement

  const childrenPrev = [...curParent.children]

  const dataParentA = []
  const dataParentB = []

  dataParentA.push(
    [...prevParent.children]
      .filter(c => c.id !== box.id)
      .map(c => ({
        target: c,
        rect: c.getBoundingClientRect(),
      }))
  )
  dataParentB.push(
    [...curParent.children]
      .filter(c => c.id !== box.id)
      .map(c => ({
        target: c,
        rect: c.getBoundingClientRect(),
      }))
  )

  curParent.append(box)

  dataParentA.push(
    [...prevParent.children]
      .filter(c => c.id !== box.id)
      .map(c => ({
        target: c,
        rect: c.getBoundingClientRect(),
      }))
  )

  dataParentB.push(
    [...curParent.children]
      .filter(c => c.id !== box.id)
      .map(c => ({
        target: c,
        rect: c.getBoundingClientRect(),
      }))
  )

  morph(dataParentB[0], dataParentB[1])
  morph(dataParentA[0], dataParentA[1])
}

function move(box, currentParent) {
  const prevPosition = box.getBoundingClientRect()
  append(currentParent, box)

  const positionNow = box.getBoundingClientRect()

  console.log({ prevPosition, positionNow })
  anime({
    targets: box,
    // width: position.width,
    translateX: [prevPosition.x - positionNow.x, 0],
    translateY: [prevPosition.y - positionNow.y, 0],
    // translateX: prevPosition.x - positionNow.x,
    // translateY: prevPosition.y - positionNow.y,
    easing: 'linear',
  })
}

// move(document.querySelector('#block_2'), document.querySelector('.waiting'))
// move(document.querySelector('#block_4'), document.querySelector('.waiting'))
// move(document.querySelector('#block_6'), document.querySelector('.waiting'))

setTimeout(() => {
  // const box = document.querySelector('#block_1')
}, 1000)
