const anime = require('animejs')
const { isArray } = require('lodash')
const _ = require('lodash')

function Colors() {
  let arr

  function shuffle() {
    arr = [
      'hsl(28, 83%, 61%)',
      'hsl(198, 100%, 46%)',
      'hsl(355, 87%, 66%)',
      'hsl(176, 56%, 55%)',
      'hsl(325, 84%, 47%)',
      'hsl(89, 47%, 40%)',
      'hsl(352, 93%, 53%)',
      'hsl(162, 70%, 34%)',
    ]
    arr.push(...arr) //duplicar
  }
  shuffle()

  return {
    get array() {
      return arr
    },
    shuffle,
  }
}

const colors = Colors()

function resetText(textComp, color, op) {
  if (op.shuffle) {
    colors.shuffle()
  }
  if (op === 'all') {
    textComp.setStyle({
      color: color ? color : 'hsl(12, 83%, 62%)',
    })
  }
  const arr = isArray(textComp) ? textComp : textComp.children

  arr.forEach((child, index) => {
    anime({
      targets: child.elementHtml,
      color: color ? color : colors.array[index] || 'hsl(12, 83%, 62%)',
    })
  })
}
function resetTexts(texts) {
  texts.forEach(texts, text => resetText(text, 'hsl(12, 83%, 62%)'))
}

function scriptParse(script, isSubtitle = false) {
  if (!script) return []
  let myScript = script
    .split(/\r\n\r\n+/g)
    .map(v =>
      v
        .split('\r\n')
        .map(v => v.trim())
        .filter(v => v.length > 0 && !v.includes('#') && v.includes('{'))
    )
    .filter(v => v.length > 0)

  if (isSubtitle) {
    myScript = myScript.reduce((acc, pt_en) => {
      if (pt_en[0].includes('|')) {
        const part1 = [pt_en[0].split('|')[0], pt_en[1].split('|')[0]]
        const part2 = [pt_en[0].split('|')[1], pt_en[1].split('|')[1]]
        acc.push(part1)
        acc.push(part2)
      } else {
        acc.push(pt_en)
      }
      return acc
    }, [])
  }

  return myScript
}

function sortByIndex(children) {
  function getNum(cur) {
    if (!cur) return 0
    return cur.match(/\d+/g) ? cur.match(/\d+/g)[0] : 0
  }
  const oldList = [...children]

  const listSorted = children.sort((a, b) => {
    if (getNum(b) !== 0 && getNum(a) === 0) return 1
    return getNum(a) - getNum(b)
  })

  return listSorted.map(novo => oldList.findIndex(x => x === novo))
}
// function splitTexts(texts) {
//   return texts.map(text => text.replace(/[^?,.!\s]+/g, '{$&}'))
// }

module.exports = {
  resetText,
  scriptParse,
  resetTexts,
  sortByIndex,
}
