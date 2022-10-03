/* eslint-disable */

function frozenAll(...dataToFixed) {
  ;[...document.querySelectorAll('.block')].forEach(element => {
    const prevPosition = element.getBoundingClientRect()
    const newStyle = dataToFixed.reduce((acc, cur) => {
      return { ...acc, [cur]: prevPosition[cur] }
    }, {})
    anime.set(element, newStyle)
  })
}

// frozenAll('width')
;[...document.querySelectorAll('.block')].forEach(element => {
  element.id = _.uniqueId('block_')
})

// function setPositionAbsolute(box, rect) {
//   const { left, right, width, height } = rect
//   box.classList.add('absolute')
//   anime({
//     targets: box,
//     left,
//     right,
//     width,
//     height,
//   })
// }

// function setAllAbsolute() {
//   const data = [...document.querySelectorAll('.block')].map(e => ({
//     box: e,
//     rect: e.getBoundingClientRect(),
//   }))
//   data.forEach(d => {
//     setPositionAbsolute(d.box, d.rect)
//   })
// }
