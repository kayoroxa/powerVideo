const obs = require('../utils/observer')

let canKeyClick = true

obs('KEY').on('priority', p => {
  if (p === false) canKeyClick = true
  else canKeyClick = false
})

document.addEventListener('keydown', e => {
  if (!canKeyClick) return
  if (e.key === 'Enter') {
    obs('CONTROL').notify('next')
  }
  if (e.key === 'Backspace') {
    document.querySelector('.app').innerHTML = ''
  }
})
