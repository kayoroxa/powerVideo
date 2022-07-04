const anime = require('animejs')

function resetText(textComp, color) {
  const colors = [
    'hsl(352, 93%, 53%)',
    'hsl(198, 100%, 46%)',
    'hsl(89, 47%, 40%)',
    'hsl(197, 93%, 29%)',
    'hsl(328, 38%, 37%)',
    'hsl(162, 70%, 34%)',
    'hsl(28, 83%, 61%)',
  ]
  textComp.children.forEach((child, index) => {
    anime({
      targets: child.elementHtml,
      color: color ? color : colors[index] || 'hsl(12, 83%, 62%)',
    })
  })
}
function resetTexts(texts) {
  texts.forEach(texts, text => resetText(text, 'hsl(12, 83%, 62%)'))
}

function scriptParse(script) {
  return script
    .split(/\r\n\r\n+/g)
    .map(v =>
      v
        .split('\r\n')
        .map(v => v.trim())
        .filter(v => v.length > 0)
    )
    .filter(v => v.length > 0)
}

// function splitTexts(texts) {
//   return texts.map(text => text.replace(/[^?,.!\s]+/g, '{$&}'))
// }

module.exports = {
  resetText,
  scriptParse,
  resetTexts,
}
