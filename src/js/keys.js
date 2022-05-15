const obs = require('../utils/observer')

document.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    obs('CONTROL').notify('next')
  }
})
