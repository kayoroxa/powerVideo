const Group = require('../utils/api/Group')
const { Text3 } = require('../utils/api/Text3')
// const anime = require('animejs')
const { morphText, sleep } = require('../utils/api/powerUtils')
const { isArray } = require('lodash')
// const _ = require('lodash')

function lettersMarks(texts) {
  if (isArray(texts)) {
    return texts.map(t => t.replace(/\w/g, '{$&}'))
  }
  return texts.replace(/\w/g, '{$&}')
}

module.exports = async props => {
  const script = lettersMarks([
    'Texto é um conjunto de palavras e frases',
    `encadeadas que permitem interpretação`,
    `e transmitem uma mensagem.`,
    `É qualquer obra escrita em versão original`,
    `e que constitui um`,
    `livro ou um documento escrito.`,
  ])
  await main(props, script)

  const script2 = lettersMarks([
    'Caio é um programador',
    `criando motores`,
    `automatizados`,
  ])
  await main(props, script2)
}

async function main({ Scene, Line }, script) {
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
        morphText(texts[index][1], texts[index + 1][0])
        line.move_animate_to(texts[index + 1][0], { padding: 20 })
      }
    })
  )

  await Scene.playClick(async () => {
    line.close()
    await sleep(600)
    await group.setStyle(
      {
        color: '#ff0000',
        top: '-200px',
      },
      { eachDelay: true }
    )

    await sleep(600)
    group.refresh_to(...texts.flat())
  })
}
