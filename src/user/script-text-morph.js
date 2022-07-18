const Group = require('../utils/api/Group')
const { Text3 } = require('../utils/api/Text3')
// const anime = require('animejs')
const { morphText, sleep } = require('../utils/api/powerUtils')
// const _ = require('lodash')

module.exports = async ({ Scene, Line }) => {
  Scene.setBackground('#021ff4')
  const script = [
    "{Don}{'t} {com}{e} {any} {closer}",
    `{Don} {com}{e} {any} {closer}`,
    `{Don} {com} {any} {closer}`,
    `{Don} {com}{any} {closer}`,
  ]

  const texts = script.map((text, index) => {
    return Array.from({ length: 2 }).map(() =>
      Text3(text)
        .setStyle({ color: '#ffae52' })
        .set_x_y({
          x: 'center',
          y: index * 100,
        })
    )
  })

  const group = Group(...texts.flat())

  group.set_x_y('center', false)

  texts[0][0].show()
  texts[0][1].show()

  const line = Line(texts[0][0], { padding: 20, color: 'hsl(233, 22%, 23%)' })

  Scene.show(line.animate())

  await Scene.playClicks(
    Array.from({ length: script.length - 1 }).map((_, index) => {
      return async () => {
        line.move_animate_to(texts[index + 1][0], {
          padding: 20,
          color: 'hsl(233, 22%, 23%)',
        })
        await sleep(300)
        morphText(texts[index][1], texts[index + 1][0])
      }
    })
  )
}
