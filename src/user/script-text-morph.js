const Group = require('../utils/api/Group')
const { Text3 } = require('../utils/api/Text3')
// const anime = require('animejs')
const { morphText, sleep } = require('../utils/api/powerUtils')
// const _ = require('lodash')

module.exports = async ({ Scene, Line }) => {
  const script = [
    '{i} {would} {have} {do} {not}',
    `{i} {would}{'ve} {do} {not}`,
    `{i} {would}{'ve} {do}{n't}`,
    `a{i} {ud}{'ve} {do}{n't}`,
    `Ca{i}o {do}{n't} do`,
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

  group.set_x_y('center', false)

  texts[0][0].show()
  texts[0][1].show()

  const line = Line(texts[0][0], { padding: 20 })

  Scene.show(line.animate())

  await Scene.playClicks(
    Array.from({ length: script.length - 1 }).map((_, index) => {
      return async () => {
        line.move_animate_to(texts[index + 1][0], { padding: 20 })
        await sleep(300)
        morphText(texts[index][1], texts[index + 1][0])
      }
    })
  )
}
