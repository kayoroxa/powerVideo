const { Scene } = require('../../utils/api/powerUtils')
const { Text3 } = require('../../utils/api/Text3')
const anime = require('animejs')
const { Line } = require('../../utils/api/line')

module.exports = async () => {
  const fraseRaw = '{w=_}h{o=3}{s=yy}e {i=ai}d{e=i}a was {th=`d}is?'

  const fraseText = fraseRaw.replace(/{([^{}=]+)=[^{}=]+}/gi, '{$1}')

  const frase = Text3(fraseText)
    .setStyle({
      fontSize: '100px',
      lineHeight: '0 !important',
    })
    .set_x_y('center')

  const wordsSoundText = fraseRaw
    .match(/{([^{}=]+)=[^{}=]+}/gi)
    .map((soundData, i) => {
      return {
        sound: soundData.match(/(?<=[=])[^}]+/gi)[0],
        index: i,
      }
    })

  const fs = wordsSoundText.map(({ sound, index }) => {
    return Text3(sound).next_to(frase.children[index], 'top', -20)
  })

  frase.show()

  const line = Line(false, { zIndex: -1000 })
  Scene.show(line.animate())

  for (const { index } of wordsSoundText) {
    await Scene.playClick(() => {
      anime({
        targets: frase.children[index].htmlElem,
        // translateY: '90px',
        opacity: 0.3,
        duration: 500,
        easing: 'linear',
      })

      if (fs[index].htmlElem.textContent === '_') {
        frase.children[index].htmlElem.classList.add('cortar')
        return
      }

      line.move_animate_to(fs[index], {
        padding: 8,
        zIndex: -1000,
        color: '#e8f1f2',
      })

      fs[index].show()
      anime({
        targets: fs[index].htmlElem,
        translateY: ['-50px', '0px'],
        opacity: [0, 1],
        easing: 'spring(1, 80, 10, 0)',
      })
    })
  }

  const fraseTextResult = fraseRaw
    .replace(/{[^=]+=([^=]+)}/gi, '{$1}')
    .replace('_', '')
  // .split('')
  // .map(v => `{${v}}`)
  // .join('')

  const fraseResult = Text3(fraseTextResult).next_to(frase, 'bottom', 30)
  // fraseResult.show()

  await Scene.playClick(() => {
    // line.close('right')

    line.move_animate_to(fraseResult, {
      padding: 40,
      paddingY: 20,
      zIndex: -1000,
      color: '#e8f1f2',
    })

    fraseResult.show()
    anime({
      targets: fraseResult.htmlElem,
      translateY: ['500px', '0px'],
      easing: 'easeInOutQuad',
    })

    // morphText(fraseClone, fraseResult)
  })
}
