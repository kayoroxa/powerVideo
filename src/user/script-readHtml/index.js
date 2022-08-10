const fs = require('fs')

const pathJoin = require('path').join

const dict = {
  title: 'To be afraid = temer / Tener miedo',
  exemple: 'I am afraid of the dark.\nTengo miedo de la oscuridad.',
  exemple2: 'texteing\nolá',
}

module.exports = async () => {
  // eslint-disable-next-line no-unused-vars
  const anime = require('animejs')
  // eslint-disable-next-line no-unused-vars
  const { sleep } = require('../../utils/api/powerUtils')

  const htmlRaw = fs.readFileSync(pathJoin(__dirname, './1.html'), 'utf8')

  const cssString = htmlRaw.match(/<style[^>]*>([\s\S]+)<\/style>/)?.[1]

  let bodyString = htmlRaw.match(/<power[^>]*>([\s\S]+)<\/power>/)?.[1]

  bodyString = bodyString.replace(/\$([^<$\s]+)/g, (_, key) => {
    return dict[key]
      ? dict[key].replace('\n', '<br>').replace('sleep(', 'await sleep(')
      : ''
  })

  const app = document.querySelector('.app')

  app.innerHTML = bodyString

  const style = document.createElement('style')

  style.innerHTML = cssString

  document.getElementsByTagName('head')[0].appendChild(style)

  const scriptString = htmlRaw.match(/<script[^>]*>([\s\S]+)<\/script>/)?.[1]

  const script = document.createElement('script')

  script.innerHTML = scriptString

  // document.getElementsByTagName('head')[0].appendChild(script)

  eval(scriptString)

  console.log(cssString)

  console.log(bodyString)
  // const htmlString =
}
