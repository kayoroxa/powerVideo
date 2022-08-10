const { Scene } = require('../../utils/api/powerUtils')
const { Text3 } = require('../../utils/api/Text3')
const anime = require('animejs')
const { Line } = require('../../utils/api/line')
// const AI = require('../../utils/AI')

const colors = {
  line: '#7dd4fc',
  text: 'hsl(218, 23%, 21%)',
  text2: 'hsl(218, 23%, 21%)',
  background: '#ffffff', //'#e8f1f2',
  S: 'hsl(284, 79%, 24%)',
}

// const setPseudoElContent = (selector, value) => {
//   document.styleSheets[0].addRule(selector, `transform: rotate(${value});`)
// }

const fontSize = 100

// function getRotation(width) {
//   return AI(width, [300, 27], [122, 61], [66, 68])
// }

module.exports = async () => {
  Scene.setBackground(colors.background)

  const scripts = [
    // 'I j{u=S}s{t=_}+wan{t=_}+to apol{o=S}{gi=dja}ze',
    // 'for {th=ð}{a=e}t+uh',
    '{u=S}npl{ea=e}{s=z}{a=S}nt s{c=_}{e=i}n{e=_} a li{ttle=rol} {ear=ɚ}li{er=ɚ}',
    // 'My fr{i=_}en{d=_} Harry an{d=_}+I w{oul=u}d+uh',
    // 'l{i=ai}k{e=_}+to b{u=a}y you g{uy=a}s+a',
    // 'r{ou=au}nd+{o=S}{f=_} b{ee=i}rs',
    // 'jus{t=_}+t{o=S} b{u=e}ry {the=Tâh} h{a=e}{t=_}chet',
    // 'Sea Bass {a=e}n{d=_}+the fell{a=â}s+offer{ed=t} to',
    // 'pick+{u=â}p+o{u=_}r {ch=tch}eck',
    // '{th=T}ey s{ai=ê}d+j{u=S}st|pu{t=r}+i{t=r}+on+{th=_}e{i=_}r t{a=e}b',
  ]

  let fraseRaw = scripts[0]
    .replace(/\+/g, '{ =_}')
    .replace(/\|/g, '{ =|}')
    .replace(/S(\S*?)\}/g, 'ə$1}')
    .replace(/R(\S*?)\}/g, 'ɚ$1}')
    .replace(/T(\S*?)\}/g, 'ð$1}')
  // .toLowerCase()

  // 'M{y=ai} fr{i=u}en{d=_} H{a=é}rry {a=e}n{d=_} I w{oul=â}d, uh'
  // const fraseRaw = '{o=â}{ugh=_}t to'

  const fraseText = fraseRaw.replace(/{([^{}=]+)=[^{}=]+}/gi, '{$1}')
  // .replace(/\+/g, ' ')
  // .replace(/\+/g, ' ')

  console.log(fraseText)

  const frase = Text3(fraseText)
    .setStyle({
      fontSize: fontSize + 'px',
      lineHeight: '0 !important',
      color: colors.text,
    })
    .set_x_y('center')

  const wordsSoundText = fraseRaw
    .match(/{([^{}=]+)=[^{}=]+}/gi)
    ?.map((soundData, i) => {
      return {
        sound: soundData.match(/(?<=[=])[^}]+/gi)[0],
        index: i,
      }
    })

  const fs = wordsSoundText?.map(({ sound, index }) => {
    return Text3(sound)
      .setStyle({ color: colors.text, fontSize: fontSize * 0.6 + 'px' })
      .next_to(frase.children[index], 'top', -20)
  })

  frase.show()

  const line = Line(false, { zIndex: -1000 })
  // Scene.show(line.animate())

  for (const { index } of wordsSoundText) {
    await Scene.playClick(() => {
      anime({
        targets: frase.children[index].htmlElem,
        // translateY: '90px',
        opacity: 0.3,
        duration: 500,
        easing: 'linear',
      })

      if (fs[index].htmlElem.textContent === '|') {
        frase.children[index].htmlElem.classList.add('cut-pause')
        return
      }

      if (frase.children[index].htmlElem.textContent === ' ') {
        frase.children[index].htmlElem.classList.add('join-words')
        return
      }

      if (fs[index].htmlElem.textContent === 'ə') {
        fs[index].htmlElem.style.color = colors.S
        //text border
        // fs[index].htmlElem.style.border = '1px solid black'
      }

      if (fs[index].htmlElem.textContent === '_') {
        frase.children[index].htmlElem.classList.add('cortar')
        const lettersCount = frase.children[index].htmlElem.textContent.replace(
          "'",
          ''
        ).length

        const textContent = frase.children[index].htmlElem.textContent
        if (textContent === 't' || textContent === 'l' || textContent === 'f') {
          frase.children[index].htmlElem.classList.add('words-half')
        } else if (
          textContent === 'i' ||
          textContent === 'h' ||
          textContent === 'th'
        ) {
          frase.children[index].htmlElem.classList.add(textContent)
        } else if (lettersCount === 1) {
          frase.children[index].htmlElem.classList.add('words-1')
        } else if (lettersCount === 2) {
          frase.children[index].htmlElem.classList.add('words-2')
        } else if (lettersCount > 2) {
          frase.children[index].htmlElem.classList.add('words-3')
        }

        line.move_animate_to(frase.children[index], {
          padding: 8,
          height: 10,
          zIndex: -1000,
          color: colors.line,
        })

        return
      }

      line.move_animate_to(fs[index], {
        padding: 8,
        zIndex: -1000,
        color: colors.line,
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
    .replace(/\+/gi, '')
    .replace(/_/gi, '')
  // .split('')
  // .map(v => `{${v}}`)
  // .join('')

  const fraseResult = Text3(fraseTextResult)
    .setStyle({ color: colors.text2, fontSize: fontSize * 0.6 + 'px' })
    .next_to(frase, 'bottom', 30)
  // fraseResult.show()

  await Scene.playClick(() => {
    // line.close('right')

    line.move_animate_to(fraseResult, {
      padding: 40,
      paddingY: 20,
      zIndex: -1000,
      color: colors.line,
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
