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

const fontSize = 80

// function getRotation(width) {
//   return AI(width, [300, 27], [122, 61], [66, 68])
// }

const replace = `
sometimes = {Some=sam}t{i=ai}m{es=z}
and = an{d=_}
against = {a=S}g{ai=e}ns{t=_}
world = wor{l=al}d
kid = k{i=ê}d
responsible = r{e=S}spons{i=S}b{le=Sl}
`

module.exports = async () => {
  Scene.setBackground(colors.background)

  const scripts = [
    // "It's+me an{d=_}+you {a=S}g{ai=e}ns{t=_}+{th=T}e wor{l=al}d, k{i=ê}d",
    // 'R{e=uâh}member {th=T}at',
    // "{Th=T}at's dr{a=S}ma{t=r}i{c=k}. Wh{a=S}{t=r}+{a=S}bout Austin?",
    // "I don'{t=_} wan{t=_}+{yo=_}u to+be n{e=S}rv{ou=S}s {a=S}bout+tomorrow",
    // "-I'm not. -L{ia=ai}{r=er}.",
    // "I'm not n{e=S}rv{ou=S}s",
    // "but I do need+{to=S} ge{t=r}+a+g{oo=S}{d=_} n{igh=ai}t's+sleep",
    // "you're so r{e=S}spons{i=S}b{le=Sl}",
    "{Some=sam}t{i=ai}m{es=z}+I can't b{e=i}l{ie=i}v{e=_}+you cam{e=_}+{ou=au}{t=r}+{of=S} me.",

    //
    // 'Com{e=_}+on. {Th=T}e co{a=_}st+is cl{ea=iê}r.',
    // '{A=o}ll+we {have=ev} t{o=S} do is get|{rid of=wRêrê} {that=Te} {th=TH}in{g=_}',
    // 'So wait|here {while I=walai} ge{t=r}+its card',
    // "but+she {ca=ke}n't st{a=e}y here",
    // "{Th=T}is+is {the=TS} men's+r{oo=u}m",
    // "{That is=Daris} {the=TS} weir{d=_}est+thin{g=_} you've+ever s{ai=e}d",
  ]

  // 'Now drop| {th=T}e b{oo=u}t',
  // "{You're=ySR} s{u=S}{ch a=tcha} g{oo=u}d| boy! Yes, you {are=aR}",
  // 'Y{ou=S}+{a=o}ll t{ire=aiR}d|from ch{a=i}sin{g=_}+{th=_}is',
  // 'b{a=e}d|m{a=e}n+{a=o}ll+over the pl{a=ei}ce?',
  // 'Ex{cu=kiu}s{e=_} me?',
  // 'Nob{ody=ari} appre{ci=chi}{a=ei}tes+you, do {th=d}ey?',
  // "com{e=_}+on. He's+a b{a=e}d hors{e=s}",
  // 'he is n{o=S}{th=TH}in{g=_} bu{t=r}+a big+sw{ee=i}t|{heart=hoRt}',

  let fraseRaw = scripts[0]
    .replace(/\+/g, '{ =_}')
    .replace(/\|/g, '{ =|}')
    .replace(/(=[^}]*?)S(\S*?)\}/g, '$1ə$2}')
    .replace(/(=[^}]*?)RR(\S*?)\}/g, '$1ɚ$2}')
    .replace(/(=[^}]*?)TH(\S*?)\}/g, '$1θ$2}')
    .replace(/(=[^}]*?)D(\S*?)\}/g, '$1ð$2}')
    .replace(/(=[^}]*?)T(\S*?)\}/g, '$1ð$2}')
    .replace(/(=[^}]*?)R(\S*?)\}/g, '$1ɹ$2}')
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
        // opacity: 0.3,
        color: 'rgb(171 174 179)',
        // color: '#bfc2c7',
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

      if (fs[index].htmlElem.textContent.includes('ə')) {
        fs[index].htmlElem.innerHTML = fs[index].htmlElem.textContent.replace(
          'ə',
          '<span style="color: ' + colors.S + '">ə</span>'
        )
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

// 'I j{u=S}s{t=_}+wan{t=_}+to apol{o=S}{gi=djai}ze',
// 'for {th=ð}{a=e}t+uh',
// '{u=S}npl{ea=e}{s=z}{a=S}nt s{c=_}{e=i}n{e=_} a li{ttle=rol} {ear=ɚ}li{er=ɚ}',
// 'My fr{i=_}en{d=_} H{a=e}rry an{d=_}+I w{oul=u}d+uh',
// 'l{i=ai}k{e=_}+to b{u=a}y you g{u=a}ys+a',
// 'r{ou=au}nd+{o=S}{f=_} b{ee=i}rs',
// 'jus{t=_}+t{o=S} b{u=e}ry {the=Tâh} h{a=e}chet',
// 'S{ea=i} B{a=e}ss {a=e}n{d=_}+{the=Tâ}+fell{a=â}s+offer{ed=_}+t{o=S}',
// 'pick+{u=â}p+o{u=_}r {ch=tch}eck',
// '{th=T}ey s{ai=ê}d+j{u=S}st|pu{t=r}+i{t=r}+on+{th=_}e{i=_}r t{a=e}b',
// "{Th=T}{ey're=er} very n{i=ai}{ce=s}",
// 'S{ea=i} B{a=e}ss s{ai=e}{d=_}+{th=T}a{t=_}?',
// 'Well, if+{u=â}h',
// '{Th=T}{a=e}{t=_} g{uy=ai} {a=e}{t=_}+{th=T}e t{a=êi}b{le=Sl} ov{er=_}+{th=T}er{e=_} is S{ea=i} B{a=e}ss',
// "{a=o}ll r{igh=uai}t, {i=_}f+{th=T}{a=e}t's+{what=uâ}+{he=ri} wants",
