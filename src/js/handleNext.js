const obs = require('../utils/observer')
const myScript = require('../user/script')

function next() {
  if (indexScript > myScript.length - 1) {
    indexScript = 0
    // return
  }
  myScript[indexScript++]()
}

let indexScript = 0

obs('dom').on('show', () => {
  next()
})

obs('CONTROL').on('next', () => {
  next()
})
