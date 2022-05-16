const Elements = require('../utils/Elemento')

module.exports = [
  () => {
    Elements('p1').changeContent('hi').changeStyle({
      left: '50px',
      top: '50px',
    })
    Elements('p2').changeContent('olá').changeStyle({
      left: '100px',
      top: '100px',
    })
  },

  () => {
    Elements('p1').changeStyle({
      left: '0px',
      top: '100px',
    })
    Elements('p2').changeContent('beijo').changeStyle({
      left: '200px',
      top: '200px',
      backgroundColor: 'orange',
    })
  },
  () => {
    Elements('p2').changeStyle(
      {
        backgroundColor: 'pink',
        top: '20px',
      },
      true
    )
  },
]
