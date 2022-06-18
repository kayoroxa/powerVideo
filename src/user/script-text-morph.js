const Group = require('../utils/api/Group')
const { Text3 } = require('../utils/api/Text3')
const anime = require('animejs')
const { morphText } = require('../utils/api/powerUtils')
const _ = require('lodash')

module.exports = async ({ Scene, Line }) => {
  const script = [
    '{i} {would} {have} {do} {not}',
    `{i} {would}{'ve} {do} {not}`,
    `{i} {would}{'ve} {do}{n't}`,
    `a{i} {ud}{'ve} {do}{n't}`,
  ]

  const texts = script.map((text, index) => {
    return Array.from({ length: 2 }).map(() =>
      Text3(text).set_x_y({
        x: 'center',
        y: index * 100,
      })
    )
  })

  const group = Group(...texts.flat())

  group.set_x_y('center')

  texts[0][0].show()
  texts[0][1].show()

  await Scene.playClicks(
    Array.from({ length: script.length - 1 }).map((_, index) => {
      console.log(texts[index][1], texts[index + 1][0])
      return () => morphText(texts[index][1], texts[index + 1][0])
    })
  )
}
