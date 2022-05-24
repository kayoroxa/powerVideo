// const obs = require('../utils/observer')
const myScript = require('../user/script')

const { Line } = require('../utils/api/line')
const { Scene, changeTextTo } = require('../utils/api/powerUtils')
const { Text2 } = require('../utils/api/Text2')

myScript({ Line, Scene, changeTextTo, Text2 })

// function next() {
//   if (indexScript > myScript.length - 1) {
//     indexScript = 0
//     // return
//   }
//   myScript[indexScript++]()
// }

// let indexScript = 0

// next() //start

// obs('CONTROL').on('next', () => {
//   next()
// })
